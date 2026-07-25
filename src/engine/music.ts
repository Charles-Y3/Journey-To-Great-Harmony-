import type { MusicTrackId } from '../state/soundStore';

// Generative ambient music via the Web Audio API — soft, sparse, and
// consonant. Starts only from a user gesture (Settings track select).

interface ActiveTrack {
  stop: () => void;
}

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let active: ActiveTrack | null = null;
let activeId: MusicTrackId | null = null;

function getContext(): AudioContext {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
    masterGain = ctx.createGain();
    // Slider 0–1 maps nearly 1:1; soft bus only trims peaks slightly.
    masterGain.gain.value = 0.85;
    const soft = ctx.createGain();
    soft.gain.value = 0.95;
    masterGain.connect(soft);
    soft.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

const FADE_IN = 4;
const FADE_OUT = 2;

function fadeInGain(audioCtx: AudioContext, target: number): GainNode {
  const g = audioCtx.createGain();
  const now = audioCtx.currentTime;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(target, now + FADE_IN);
  return g;
}

function fadeOutAndStop(audioCtx: AudioContext, gain: GainNode, cleanup: () => void) {
  const now = audioCtx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(0, now + FADE_OUT);
  window.setTimeout(cleanup, (FADE_OUT + 0.2) * 1000);
}

/** Soft temple bell: sine + quiet octave, long decay, wide gaps. */
function buildBells(audioCtx: AudioContext, out: AudioNode): ActiveTrack {
  const bellGain = fadeInGain(audioCtx, 0.45);
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1800;
  filter.Q.value = 0.5;
  bellGain.connect(filter);
  filter.connect(out);

  // Mid-low pentatonic — warmer, less piercing.
  const pentatonic = [261.63, 293.66, 329.63, 392.0, 440.0]; // C D E G A
  let stopped = false;
  let timeoutId: number | null = null;

  function pluck() {
    if (stopped) return;
    const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
    const now = audioCtx.currentTime;

    const makePartial = (f: number, peak: number, dur: number) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      const env = audioCtx.createGain();
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(peak, now + 0.06);
      env.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(env);
      env.connect(bellGain);
      osc.start(now);
      osc.stop(now + dur + 0.05);
    };

    makePartial(freq, 0.55, 5.5);
    makePartial(freq * 2.003, 0.1, 3.2);

    timeoutId = window.setTimeout(pluck, 5500 + Math.random() * 7000);
  }
  timeoutId = window.setTimeout(pluck, 2000);

  return {
    stop() {
      stopped = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      fadeOutAndStop(audioCtx, bellGain, () => {});
    },
  };
}

/** Airy wind chimes: soft attack, sparse rings, no bed tone. */
function buildChimes(audioCtx: AudioContext, out: AudioNode): ActiveTrack {
  const chimeGain = fadeInGain(audioCtx, 0.4);
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 3200;
  filter.Q.value = 0.4;
  chimeGain.connect(filter);
  filter.connect(out);

  const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5–A5
  let stopped = false;
  let timeoutId: number | null = null;

  function ring() {
    if (stopped) return;
    const notes = Math.random() < 0.2 ? 2 : 1;
    for (let n = 0; n < notes; n++) {
      const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      const pan = audioCtx.createStereoPanner();
      pan.pan.value = Math.random() * 1.2 - 0.6;
      const env = audioCtx.createGain();
      const now = audioCtx.currentTime + n * 0.22;
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.28, now + 0.04);
      env.gain.exponentialRampToValueAtTime(0.001, now + 4.0);
      osc.frequency.value = freq;
      osc.connect(env);
      env.connect(pan);
      pan.connect(chimeGain);
      osc.start(now);
      osc.stop(now + 4.1);

      const partial = audioCtx.createOscillator();
      partial.type = 'sine';
      partial.frequency.value = freq * 2.002;
      const pEnv = audioCtx.createGain();
      pEnv.gain.setValueAtTime(0, now);
      pEnv.gain.linearRampToValueAtTime(0.06, now + 0.03);
      pEnv.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
      partial.connect(pEnv);
      pEnv.connect(pan);
      partial.start(now);
      partial.stop(now + 2.1);
    }
    timeoutId = window.setTimeout(ring, 4500 + Math.random() * 6500);
  }
  timeoutId = window.setTimeout(ring, 1800);

  return {
    stop() {
      stopped = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      fadeOutAndStop(audioCtx, chimeGain, () => {});
    },
  };
}

const BUILDERS: Record<MusicTrackId, (audioCtx: AudioContext, out: AudioNode) => ActiveTrack> = {
  bells: buildBells,
  chimes: buildChimes,
};

export function playMusicTrack(id: MusicTrackId): void {
  const audioCtx = getContext();
  if (activeId === id) return;
  stopMusic();
  active = BUILDERS[id](audioCtx, masterGain!);
  activeId = id;
}

export function stopMusic(): void {
  active?.stop();
  active = null;
  activeId = null;
}

export function setMusicVolume(volume: number): void {
  if (!ctx || !masterGain) return;
  // Near-linear mapping so the Settings slider reaches an audible level.
  masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, volume)) * 0.95, ctx.currentTime, 0.12);
}

export function currentMusicTrack(): MusicTrackId | null {
  return activeId;
}
