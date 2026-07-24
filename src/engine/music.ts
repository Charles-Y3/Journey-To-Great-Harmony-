import type { MusicTrackId } from '../state/soundStore';

// A small, free, generative ambient-music engine: everything here is
// synthesized locally with the Web Audio API — oscillators, filters, and a
// noise buffer — rather than streaming or bundling licensed audio files.
// It only ever starts from a user gesture (the Settings play button),
// which also satisfies browser autoplay restrictions.

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
    masterGain.gain.value = 0.35;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

const FADE_IN = 2.5;
const FADE_OUT = 1.2;

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
  window.setTimeout(cleanup, (FADE_OUT + 0.1) * 1000);
}

/** A slowly shifting drone: three detuned tones through a filter with a slow LFO on its cutoff. */
function buildDrone(audioCtx: AudioContext, out: AudioNode, baseFreq: number, level: number): ActiveTrack {
  const gain = fadeInGain(audioCtx, level);
  gain.connect(out);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 900;
  filter.Q.value = 0.7;
  filter.connect(gain);

  const ratios = [1, 1.5, 2]; // root, perfect fifth, octave
  const oscs = ratios.map((ratio, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = baseFreq * ratio;
    osc.detune.value = (i - 1) * 5;
    const oscGain = audioCtx.createGain();
    oscGain.gain.value = 1 / ratios.length;
    osc.connect(oscGain);
    oscGain.connect(filter);
    osc.start();
    return osc;
  });

  const lfo = audioCtx.createOscillator();
  lfo.frequency.value = 0.04;
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 260;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  return {
    stop() {
      fadeOutAndStop(audioCtx, gain, () => {
        oscs.forEach((o) => o.stop());
        lfo.stop();
      });
    },
  };
}

/** The drone plus soft, irregularly-spaced pentatonic bell tones. */
function buildBells(audioCtx: AudioContext, out: AudioNode): ActiveTrack {
  const drone = buildDrone(audioCtx, out, 130.81, 0.22); // C3 drone, quieter under the bells
  const bellGain = fadeInGain(audioCtx, 0.3);
  bellGain.connect(out);

  const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0]; // C D E G A (5th octave)
  let stopped = false;
  let timeoutId: number | null = null;

  function pluck() {
    if (stopped) return;
    const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    const env = audioCtx.createGain();
    const now = audioCtx.currentTime;
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.5, now + 0.05);
    env.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
    osc.frequency.value = freq;
    osc.connect(env);
    env.connect(bellGain);
    osc.start(now);
    osc.stop(now + 3.3);
    timeoutId = window.setTimeout(pluck, 3500 + Math.random() * 4500);
  }
  timeoutId = window.setTimeout(pluck, 1200);

  return {
    stop() {
      stopped = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      drone.stop();
      fadeOutAndStop(audioCtx, bellGain, () => {});
    },
  };
}

/** Filtered, looping noise for a soft rain/breeze bed, with a slowly wandering bandpass filter. */
function buildRain(audioCtx: AudioContext, out: AudioNode): ActiveTrack {
  const gain = fadeInGain(audioCtx, 0.22);
  gain.connect(out);

  const bufferSeconds = 4;
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * bufferSeconds, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02; // brown-ish noise: smoother, less hissy than white noise
    data[i] = last * 3.2;
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 700;
  filter.Q.value = 0.6;

  const lfo = audioCtx.createOscillator();
  lfo.frequency.value = 0.03;
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 350;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  source.connect(filter);
  filter.connect(gain);
  source.start();

  return {
    stop() {
      fadeOutAndStop(audioCtx, gain, () => {
        source.stop();
        lfo.stop();
      });
    },
  };
}

const BUILDERS: Record<MusicTrackId, (audioCtx: AudioContext, out: AudioNode) => ActiveTrack> = {
  bowl: (audioCtx, out) => buildDrone(audioCtx, out, 98, 0.3), // G2 singing-bowl-like drone
  bells: buildBells,
  rain: buildRain,
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
  masterGain.gain.setTargetAtTime(volume, ctx.currentTime, 0.1);
}

export function currentMusicTrack(): MusicTrackId | null {
  return activeId;
}
