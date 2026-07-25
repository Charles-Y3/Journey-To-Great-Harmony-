import { useSound } from '../state/soundStore';

// Short Web Audio one-shots for ritual moments. Shares no state with the
// ambient music engine beyond reading volume from soundStore — if volume is
// zero, SFX stay silent (treats "music off / muted" as quiet practice).

export type SfxId = 'chime' | 'bell' | 'hush' | 'harmony' | 'celebrate';

let ctx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function volume(): number {
  return Math.max(0, Math.min(1, useSound.getState().musicVolume));
}

function tone(
  audioCtx: AudioContext,
  freq: number,
  start: number,
  dur: number,
  peak: number,
  type: OscillatorType = 'sine',
) {
  const osc = audioCtx.createOscillator();
  const env = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(peak, start + 0.02);
  env.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.connect(env);
  env.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

function playChime(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  tone(audioCtx, 659.25, now, 1.4, 0.22 * vol);
  tone(audioCtx, 987.77, now + 0.08, 1.6, 0.14 * vol);
}

function playBell(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  tone(audioCtx, 392.0, now, 2.2, 0.28 * vol);
  tone(audioCtx, 784.0, now, 1.8, 0.1 * vol);
}

function playHush(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  tone(audioCtx, 196.0, now, 2.8, 0.12 * vol, 'triangle');
  tone(audioCtx, 246.94, now + 0.15, 2.4, 0.08 * vol, 'triangle');
}

function playHarmony(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  const freqs = [523.25, 659.25, 783.99];
  freqs.forEach((f, i) => tone(audioCtx, f, now + i * 0.12, 1.8, 0.16 * vol));
}

function playCelebrate(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  tone(audioCtx, 523.25, now, 0.9, 0.18 * vol);
  tone(audioCtx, 659.25, now + 0.1, 1.0, 0.16 * vol);
  tone(audioCtx, 783.99, now + 0.2, 1.3, 0.14 * vol);
  tone(audioCtx, 1046.5, now + 0.35, 1.5, 0.12 * vol);
}

const PLAYERS: Record<SfxId, (ctx: AudioContext, vol: number) => void> = {
  chime: playChime,
  bell: playBell,
  hush: playHush,
  harmony: playHarmony,
  celebrate: playCelebrate,
};

/** Play a one-shot. No-ops when volume is zero (muted / music off). */
export function playSfx(id: SfxId): void {
  const vol = volume();
  if (vol <= 0.001) return;
  try {
    const audioCtx = getContext();
    PLAYERS[id](audioCtx, vol);
  } catch {
    // Autoplay or unsupported — ignore; ritual should never crash the app.
  }
}

function noiseBurst(audioCtx: AudioContext, start: number, dur: number, peak: number, hipass = 800) {
  const len = Math.max(1, Math.floor(audioCtx.sampleRate * dur));
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = audioCtx.createBufferSource();
  src.buffer = buf;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = hipass;
  filter.Q.value = 0.8;
  const env = audioCtx.createGain();
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(peak, start + 0.02);
  env.gain.exponentialRampToValueAtTime(0.001, start + dur);
  src.connect(filter);
  filter.connect(env);
  env.connect(audioCtx.destination);
  src.start(start);
  src.stop(start + dur + 0.02);
}

/** Short sparrow-like chirp. */
function playChirp(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  const base = 2200 + Math.random() * 700;
  tone(audioCtx, base, now, 0.07, 0.055 * vol, 'sine');
  tone(audioCtx, base * 1.15, now + 0.06, 0.06, 0.04 * vol, 'sine');
  if (Math.random() < 0.5) tone(audioCtx, base * 0.9, now + 0.13, 0.05, 0.03 * vol, 'sine');
}

/** Soft dove / wood-pigeon coo. */
function playSoftCoo(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  tone(audioCtx, 390 + Math.random() * 30, now, 0.4, 0.04 * vol, 'triangle');
  tone(audioCtx, 360, now + 0.2, 0.45, 0.03 * vol, 'triangle');
}

/** Quick wing flutter — occasional birds passing. */
function playWingFlutter(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  noiseBurst(audioCtx, now, 0.14, 0.045 * vol, 1400);
  noiseBurst(audioCtx, now + 0.1, 0.12, 0.035 * vol, 1200);
  noiseBurst(audioCtx, now + 0.2, 0.1, 0.025 * vol, 1000);
}

/** Distant crow / rook call. */
function playCrow(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  const f = 300 + Math.random() * 35;
  tone(audioCtx, f, now, 0.3, 0.045 * vol, 'triangle');
  tone(audioCtx, f * 0.9, now + 0.24, 0.34, 0.035 * vol, 'triangle');
}

/** Soft squirrel-like chatter. */
function playChatter(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  for (let i = 0; i < 4; i++) {
    tone(audioCtx, 980 + Math.random() * 160, now + i * 0.07, 0.045, 0.022 * vol, 'triangle');
  }
}

/** Quiet frog / pond plip for oasis-ish moments. */
function playPondPlip(audioCtx: AudioContext, vol: number) {
  const now = audioCtx.currentTime;
  tone(audioCtx, 520 + Math.random() * 80, now, 0.12, 0.035 * vol, 'sine');
  tone(audioCtx, 240, now + 0.04, 0.18, 0.02 * vol, 'triangle');
}

let forestLoopTimer: number | null = null;

/** Occasional birds / animals while the Virtue Forest tab is open — sparse, not a loop bed. */
export function startForestAmbience(): void {
  stopForestAmbience();
  const tick = () => {
    if (useSound.getState().forestMuted) return;
    const vol = volume();
    if (vol <= 0.001) return;
    try {
      const audioCtx = getContext();
      const roll = Math.random();
      if (roll < 0.38) playChirp(audioCtx, vol * 0.9);
      else if (roll < 0.55) playWingFlutter(audioCtx, vol * 0.85);
      else if (roll < 0.7) playSoftCoo(audioCtx, vol * 0.85);
      else if (roll < 0.82) playCrow(audioCtx, vol * 0.7);
      else if (roll < 0.92) playChatter(audioCtx, vol * 0.75);
      else playPondPlip(audioCtx, vol * 0.7);
    } catch {
      /* ignore */
    }
  };
  // First sound after a pause; then long gaps so it feels like a living place.
  forestLoopTimer = window.setTimeout(function loop() {
    tick();
    forestLoopTimer = window.setTimeout(loop, 5500 + Math.random() * 9000);
  }, 1600);
}

export function stopForestAmbience(): void {
  if (forestLoopTimer !== null) {
    window.clearTimeout(forestLoopTimer);
    forestLoopTimer = null;
  }
}
