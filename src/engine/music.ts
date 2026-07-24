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

/** Soft, irregularly-spaced pentatonic bell tones, with silence between —
 * no continuous tone underneath. An earlier version kept a quiet drone
 * running under the plucks at all times, which read as an unwanted low
 * hum rather than part of the music; removed rather than just quieted. */
function buildBells(audioCtx: AudioContext, out: AudioNode): ActiveTrack {
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
      fadeOutAndStop(audioCtx, bellGain, () => {});
    },
  };
}

/** A warm, layered pad: several softly detuned voices under a slow filter
 * sweep and a gentle vibrato-like wobble, for a "breathing" ambient bed.
 * Uses the same root/fifth/octave ratios as a clean, consonant chord (no
 * dissonant intervals close enough to beat against each other) — an
 * earlier version included a near-third interval that beat against the
 * other voices and read as a low humming/buzzing artifact rather than a
 * calm tone. */
function buildPad(audioCtx: AudioContext, out: AudioNode, baseFreq: number, level: number): ActiveTrack {
  const gain = fadeInGain(audioCtx, level);
  gain.connect(out);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 700;
  filter.Q.value = 0.5;
  filter.connect(gain);

  // Root, fifth, octave, octave+fifth — all pure harmonic ratios, so no
  // two voices sit close enough in pitch to beat against each other.
  const ratios = [1, 1.5, 2, 3];
  const oscs = ratios.map((ratio, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = baseFreq * ratio;
    osc.detune.value = (i - 1.5) * 2;
    const oscGain = audioCtx.createGain();
    oscGain.gain.value = 1 / ratios.length;
    osc.connect(oscGain);
    oscGain.connect(filter);
    osc.start();
    return osc;
  });

  const filterLfo = audioCtx.createOscillator();
  filterLfo.frequency.value = 0.05;
  const filterLfoGain = audioCtx.createGain();
  filterLfoGain.gain.value = 220;
  filterLfo.connect(filterLfoGain);
  filterLfoGain.connect(filter.frequency);
  filterLfo.start();

  // A slow, subtle vibrato across all voices via detune, so the chord feels
  // like it's gently breathing rather than perfectly static.
  const vibrato = audioCtx.createOscillator();
  vibrato.frequency.value = 0.12;
  const vibratoGain = audioCtx.createGain();
  vibratoGain.gain.value = 2;
  vibrato.connect(vibratoGain);
  oscs.forEach((o) => vibratoGain.connect(o.detune));
  vibrato.start();

  return {
    stop() {
      fadeOutAndStop(audioCtx, gain, () => {
        oscs.forEach((o) => o.stop());
        filterLfo.stop();
        vibrato.stop();
      });
    },
  };
}

/** Sparse, high, airy plucks with a soft stereo drift — wind chimes, not
 * looping noise, and no continuous tone bed underneath (an earlier version
 * layered a quiet pad chord under the chimes, which read as an unwanted
 * low hum rather than part of the music). */
function buildChimes(audioCtx: AudioContext, out: AudioNode): ActiveTrack {
  const chimeGain = fadeInGain(audioCtx, 0.28);
  chimeGain.connect(out);

  const pentatonic = [1046.5, 1174.66, 1318.51, 1567.98, 1760.0]; // C D E G A (6th octave)
  let stopped = false;
  let timeoutId: number | null = null;

  function ring() {
    if (stopped) return;
    const notes = Math.random() < 0.3 ? 2 : 1; // occasionally two chimes ring close together
    for (let n = 0; n < notes; n++) {
      const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      const pan = audioCtx.createStereoPanner();
      pan.pan.value = Math.random() * 1.6 - 0.8;
      const env = audioCtx.createGain();
      const now = audioCtx.currentTime + n * 0.12;
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.22, now + 0.02);
      env.gain.exponentialRampToValueAtTime(0.001, now + 2.6);
      osc.frequency.value = freq;
      osc.connect(env);
      env.connect(pan);
      pan.connect(chimeGain);
      osc.start(now);
      osc.stop(now + 2.7);
    }
    timeoutId = window.setTimeout(ring, 2600 + Math.random() * 3800);
  }
  timeoutId = window.setTimeout(ring, 900);

  return {
    stop() {
      stopped = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      fadeOutAndStop(audioCtx, chimeGain, () => {});
    },
  };
}

const BUILDERS: Record<MusicTrackId, (audioCtx: AudioContext, out: AudioNode) => ActiveTrack> = {
  pad: (audioCtx, out) => buildPad(audioCtx, out, 98, 0.3), // G2-rooted warm pad
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
  masterGain.gain.setTargetAtTime(volume, ctx.currentTime, 0.1);
}

export function currentMusicTrack(): MusicTrackId | null {
  return activeId;
}
