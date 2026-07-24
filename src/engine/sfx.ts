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
