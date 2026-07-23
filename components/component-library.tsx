'use client'

import {
  AnimatePresence,
  motion,
} from 'motion/react'
import { Check, ChevronDown, Copy, Sparkles, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Reveal, SectionHeading } from '@/components/reveal'

type ComponentTheme = 'base' | 'glass' | 'brutalist' | 'minimal'

interface ThemeTokens {
  primaryBtn: string
  secondaryBtn: string
  ghostBtn: string
  disabledBtn: string
  badgeNew: string
  badgeDraft: string
  badgeLive: string
  badgeLiveDot: string
  badgeBeta: string
  inputLabel: string
  input: string
  readOnlyField: string
  copyBtn: string
  tabBar: string
  tabActive: string
  tabInactive: string
  tabPanel: string
  accordion: string
  accordionBtn: string
  accordionContent: string
  overlayPrimaryBtn: string
  overlaySecondaryBtn: string
  dialogBackdrop: string
  dialog: string
  dialogIcon: string
  dialogTitle: string
  dialogClose: string
  dialogBody: string
  dialogAction: string
  toast: string
  toastIcon: string
  toastText: string
  table: string
  tableHead: string
  tableHeadCell: string
  tableCell: string
  tableMutedCell: string
  tableRow: string
  tableBadgeStable: string
  tableBadgeBeta: string
  chartContainer: string
  chartBar: string
  chartLabel: string
  demoCard: string
  demoLabel: string
  briefCard: string
  briefAvatar: string
  briefBubble: string
  scene: string
}

const THEME_STYLES: Record<ComponentTheme, ThemeTokens> = {
  base: {
    primaryBtn:
      'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0',
    secondaryBtn:
      'rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40',
    ghostBtn:
      'rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
    disabledBtn: 'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-40',
    badgeNew: 'rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary',
    badgeDraft: 'rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground',
    badgeLive: 'inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-foreground',
    badgeLiveDot: 'size-1.5 rounded-full bg-primary',
    badgeBeta: 'rounded-full bg-foreground px-2.5 py-1 text-xs text-background',
    inputLabel: 'text-muted-foreground',
    input:
      'rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15',
    readOnlyField:
      'flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground',
    copyBtn:
      'inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/40',
    tabBar: 'flex gap-1 rounded-full border border-border bg-card p-1',
    tabActive: 'absolute inset-0 rounded-full bg-primary',
    tabInactive: 'text-muted-foreground',
    tabPanel: 'mt-4 rounded-xl border border-border bg-card/50 p-4 text-sm text-muted-foreground',
    accordion: 'w-full divide-y divide-border rounded-xl border border-border bg-card/50',
    accordionBtn: 'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium',
    accordionContent: 'px-4 pb-4 text-sm leading-relaxed text-muted-foreground',
    overlayPrimaryBtn:
      'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5',
    overlaySecondaryBtn:
      'rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40',
    dialogBackdrop:
      'fixed inset-0 z-60 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm',
    dialog: 'w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl',
    dialogIcon: 'flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground',
    dialogTitle: 'mt-4 font-serif text-2xl tracking-tight',
    dialogClose:
      'rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
    dialogBody: 'mt-2 text-sm leading-relaxed text-muted-foreground',
    dialogAction: 'mt-5 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground',
    toast: 'flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-xl',
    toastIcon: 'flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground',
    toastText: 'text-sm font-medium text-foreground',
    table: 'w-full overflow-x-auto rounded-xl border border-border',
    tableHead:
      'border-b border-border bg-muted/40 text-left text-xs tracking-wide text-muted-foreground uppercase',
    tableHeadCell: 'px-4 py-3 font-medium whitespace-nowrap',
    tableCell: 'px-4 py-3 font-medium whitespace-nowrap',
    tableMutedCell: 'px-4 py-3 whitespace-nowrap text-muted-foreground',
    tableRow: 'border-b border-border last:border-0 transition-colors hover:bg-muted/30',
    tableBadgeStable: 'rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary',
    tableBadgeBeta: 'rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground',
    chartContainer:
      'flex items-end justify-between gap-2 rounded-xl border border-border bg-card/50 p-4',
    chartBar: 'w-full rounded-t-md bg-primary/80 transition-colors hover:bg-primary',
    chartLabel: 'text-[11px] text-muted-foreground',
    demoCard: 'flex h-full min-h-52 flex-col rounded-2xl border border-border bg-card/40 p-5',
    demoLabel: 'mb-4 font-mono text-[11px] tracking-widest text-muted-foreground uppercase',
    briefCard: 'flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-6',
    briefAvatar:
      'flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted',
    briefBubble:
      'relative min-w-0 flex-1 rounded-bl rounded-tl-3xl rounded-r-3xl border border-border bg-secondary px-4 py-3 text-sm leading-relaxed text-secondary-foreground',
    scene: '',
  },
  glass: {
    primaryBtn:
      'rounded-full bg-linear-to-r from-sky-400/90 to-blue-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/25 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40',
    secondaryBtn:
      'rounded-full border border-white/50 bg-white/25 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-white/40',
    ghostBtn:
      'rounded-full px-4 py-2 text-sm font-medium text-slate-500 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-slate-800',
    disabledBtn:
      'rounded-full bg-linear-to-r from-sky-400/40 to-blue-500/40 px-4 py-2 text-sm font-medium text-white/70 opacity-60',
    badgeNew:
      'rounded-full border border-sky-200/60 bg-sky-400/20 px-2.5 py-1 text-xs font-medium text-sky-700 backdrop-blur-sm',
    badgeDraft:
      'rounded-full border border-white/50 bg-white/15 px-2.5 py-1 text-xs text-slate-500 backdrop-blur-sm',
    badgeLive:
      'inline-flex items-center gap-1 rounded-full border border-emerald-200/50 bg-emerald-400/15 px-2.5 py-1 text-xs text-emerald-700 backdrop-blur-sm',
    badgeLiveDot: 'size-1.5 rounded-full bg-emerald-400',
    badgeBeta:
      'rounded-full bg-linear-to-r from-violet-400/80 to-fuchsia-400/80 px-2.5 py-1 text-xs text-white shadow-sm',
    inputLabel: 'text-slate-500',
    input:
      'rounded-2xl border border-white/50 bg-white/30 px-3 py-2 text-sm text-slate-800 shadow-inner shadow-white/20 outline-none backdrop-blur-md transition-all placeholder:text-slate-400 focus:border-sky-300/70 focus:ring-2 focus:ring-sky-300/30',
    readOnlyField:
      'flex flex-1 items-center gap-2 rounded-2xl border border-white/50 bg-white/25 px-3 py-2 text-sm text-slate-500 shadow-sm backdrop-blur-md',
    copyBtn:
      'inline-flex items-center gap-1.5 rounded-2xl border border-white/50 bg-white/30 px-3 py-2 text-sm text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-white/45',
    tabBar:
      'flex gap-1 rounded-full border border-white/50 bg-white/20 p-1 shadow-lg shadow-sky-900/5 backdrop-blur-xl',
    tabActive:
      'absolute inset-0 rounded-full bg-linear-to-r from-sky-400/90 to-blue-500/90 shadow-md shadow-blue-500/20',
    tabInactive: 'text-slate-500',
    tabPanel:
      'mt-4 rounded-3xl border border-white/50 bg-white/25 p-4 text-sm text-slate-600 shadow-lg shadow-sky-900/5 backdrop-blur-xl',
    accordion:
      'w-full divide-y divide-white/30 overflow-hidden rounded-3xl border border-white/50 bg-white/20 shadow-lg shadow-sky-900/5 backdrop-blur-xl',
    accordionBtn:
      'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-slate-700',
    accordionContent: 'px-4 pb-4 text-sm leading-relaxed text-slate-500',
    overlayPrimaryBtn:
      'rounded-full bg-linear-to-r from-sky-400/90 to-blue-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/25 backdrop-blur-sm transition-transform hover:-translate-y-0.5',
    overlaySecondaryBtn:
      'rounded-full border border-white/50 bg-white/25 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-white/40',
    dialogBackdrop:
      'fixed inset-0 z-60 flex items-center justify-center bg-slate-900/20 p-4 backdrop-blur-md',
    dialog:
      'w-full max-w-sm rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl',
    dialogIcon:
      'flex size-10 items-center justify-center rounded-full bg-linear-to-br from-sky-400/80 to-blue-500/80 text-white shadow-md',
    dialogTitle: 'mt-4 font-serif text-2xl tracking-tight text-slate-800',
    dialogClose:
      'rounded-full p-1 text-slate-500 transition-colors hover:bg-white/40 hover:text-slate-800',
    dialogBody: 'mt-2 text-sm leading-relaxed text-slate-600',
    dialogAction:
      'mt-5 w-full rounded-full bg-linear-to-r from-sky-400/90 to-blue-500/90 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25',
    toast:
      'flex items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-xl shadow-sky-900/10',
    toastIcon:
      'flex size-6 items-center justify-center rounded-full bg-linear-to-r from-sky-500 to-blue-600 text-white',
    toastText: 'text-sm font-medium text-slate-900',
    table:
      'w-full overflow-x-auto rounded-3xl border border-white/50 bg-white/25 shadow-lg shadow-sky-900/5 backdrop-blur-xl',
    tableHead:
      'border-b border-white/40 bg-white/30 text-left text-xs tracking-wide text-slate-700 uppercase backdrop-blur-sm',
    tableHeadCell: 'px-4 py-3 font-semibold whitespace-nowrap text-slate-700',
    tableCell: 'px-4 py-3 font-medium whitespace-nowrap text-slate-800',
    tableMutedCell: 'px-4 py-3 whitespace-nowrap text-slate-600',
    tableRow: 'border-b border-white/30 last:border-0 transition-colors hover:bg-white/20',
    tableBadgeStable:
      'rounded-full border border-sky-200/50 bg-sky-400/20 px-2 py-0.5 text-xs text-sky-700',
    tableBadgeBeta:
      'rounded-full border border-white/40 bg-white/20 px-2 py-0.5 text-xs text-slate-500',
    chartContainer:
      'flex items-end justify-between gap-2 rounded-3xl border border-white/50 bg-white/25 p-4 shadow-lg shadow-sky-900/5 backdrop-blur-xl',
    chartBar:
      'w-full rounded-t-xl bg-linear-to-t from-sky-500/90 to-sky-300/70 shadow-sm transition-colors hover:from-sky-500 hover:to-sky-400',
    chartLabel: 'text-[11px] text-slate-500',
    demoCard:
      'flex h-full min-h-52 flex-col rounded-3xl border border-white/50 bg-white/25 p-5 shadow-xl shadow-sky-900/5 backdrop-blur-xl',
    demoLabel: 'mb-4 font-mono text-[11px] tracking-widest text-slate-500 uppercase',
    briefCard:
      'flex items-start gap-4 rounded-3xl border border-white/50 bg-white/30 p-6 shadow-xl shadow-sky-900/5 backdrop-blur-xl',
    briefAvatar:
      'flex size-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/40 text-slate-600 shadow-sm backdrop-blur-md',
    briefBubble:
      'relative min-w-0 flex-1 rounded-bl rounded-tl-3xl rounded-r-3xl border border-white/50 bg-white/45 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm backdrop-blur-md',
    scene:
      'rounded-3xl border border-white/40 bg-linear-to-br from-sky-100/80 via-white/40 to-blue-100/60 p-4 shadow-inner shadow-sky-900/5 sm:p-6',
  },
  brutalist: {
    primaryBtn:
      'rounded-none border-2 border-black bg-[#FF3300] px-4 py-2 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_#000] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none',
    secondaryBtn:
      'rounded-none border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_#000] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]',
    ghostBtn:
      'rounded-none border-2 border-transparent px-4 py-2 text-sm font-bold uppercase tracking-wide text-black underline decoration-2 underline-offset-4 hover:bg-[#FFFF00]',
    disabledBtn:
      'rounded-none border-2 border-black bg-neutral-300 px-4 py-2 text-sm font-black uppercase tracking-wider text-neutral-500 opacity-70',
    badgeNew:
      'rounded-none border-2 border-black bg-[#FFFF00] px-2.5 py-1 text-xs font-black uppercase text-black',
    badgeDraft:
      'rounded-none border-2 border-black bg-white px-2.5 py-1 text-xs font-bold uppercase text-black',
    badgeLive:
      'inline-flex items-center gap-1 rounded-none border-2 border-black bg-[#00FF66] px-2.5 py-1 text-xs font-black uppercase text-black',
    badgeLiveDot: 'size-2 rounded-none border border-black bg-black',
    badgeBeta:
      'rounded-none border-2 border-black bg-black px-2.5 py-1 text-xs font-black uppercase text-[#FFFF00]',
    inputLabel: 'font-black uppercase tracking-wide text-black',
    input:
      'rounded-none border-2 border-black bg-white px-3 py-2 text-sm font-medium text-black shadow-[3px_3px_0_0_#000] outline-none focus:bg-[#FFFF00] focus:ring-0',
    readOnlyField:
      'flex min-w-0 flex-1 items-center gap-2 rounded-none border-2 border-black bg-[#F5F5F5] px-3 py-2 text-sm font-bold text-black shadow-[3px_3px_0_0_#000]',
    copyBtn:
      'inline-flex shrink-0 items-center gap-1.5 rounded-none border-2 border-black bg-[#FFFF00] px-3 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_#000]',
    tabBar: 'flex gap-0 border-2 border-black bg-[#FFFF00] p-0 shadow-[4px_4px_0_0_#000]',
    tabActive: 'absolute inset-0 bg-black',
    tabInactive: 'text-black',
    tabPanel:
      'mt-4 rounded-none border-2 border-black bg-white p-4 text-sm font-medium text-black shadow-[6px_6px_0_0_#000]',
    accordion:
      'w-full divide-y-2 divide-black overflow-hidden rounded-none border-2 border-black bg-white shadow-[6px_6px_0_0_#000]',
    accordionBtn:
      'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-black uppercase tracking-wide text-black hover:bg-[#FFFF00]',
    accordionContent: 'px-4 pb-4 text-sm font-medium leading-relaxed text-black',
    overlayPrimaryBtn:
      'rounded-none border-2 border-black bg-[#FF3300] px-4 py-2 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_#000] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]',
    overlaySecondaryBtn:
      'rounded-none border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_#000]',
    dialogBackdrop:
      'fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4',
    dialog:
      'w-full max-w-sm rounded-none border-4 border-black bg-[#FFFEF0] p-6 shadow-[12px_12px_0_0_#000]',
    dialogIcon:
      'flex size-10 items-center justify-center rounded-none border-2 border-black bg-[#FFFF00] text-black',
    dialogTitle: 'mt-4 font-serif text-2xl font-black uppercase tracking-tight text-black',
    dialogClose:
      'rounded-none border-2 border-black bg-white p-1 text-black transition-colors hover:bg-[#FF3300]',
    dialogBody: 'mt-2 text-sm font-medium leading-relaxed text-black',
    dialogAction:
      'mt-5 w-full rounded-none border-2 border-black bg-[#FF3300] py-2.5 text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0_0_#000]',
    toast:
      'flex items-center gap-3 rounded-none border-2 border-black bg-[#FFFF00] px-4 py-3 shadow-[6px_6px_0_0_#000]',
    toastIcon:
      'flex size-6 items-center justify-center rounded-none border-2 border-black bg-black text-[#FFFF00]',
    toastText: 'text-sm font-black uppercase text-black',
    table:
      'w-full overflow-x-auto rounded-none border-2 border-black bg-white shadow-[6px_6px_0_0_#000]',
    tableHead:
      'border-b-2 border-black bg-black text-left text-xs font-black tracking-wide text-[#FFFF00] uppercase',
    tableHeadCell: 'px-4 py-3 font-black whitespace-nowrap text-[#FFFF00]',
    tableCell: 'px-4 py-3 font-bold whitespace-nowrap text-black',
    tableMutedCell: 'px-4 py-3 font-bold whitespace-nowrap text-black',
    tableRow: 'border-b-2 border-black last:border-0 transition-colors hover:bg-[#FFFF00]',
    tableBadgeStable:
      'rounded-none border border-black bg-[#00FF66] px-2 py-0.5 text-xs font-black uppercase text-black',
    tableBadgeBeta:
      'rounded-none border border-black bg-white px-2 py-0.5 text-xs font-bold uppercase text-black',
    chartContainer:
      'flex items-end justify-between gap-2 rounded-none border-2 border-black bg-white p-4 shadow-[6px_6px_0_0_#000]',
    chartBar:
      'w-full rounded-none border border-black bg-[#FF3300] transition-colors hover:bg-[#FFFF00]',
    chartLabel: 'text-[11px] font-black uppercase text-black',
    demoCard:
      'flex h-full min-h-52 flex-col rounded-none border-4 border-black bg-[#FFFEF0] p-5 shadow-[8px_8px_0_0_#000]',
    demoLabel: 'mb-4 font-mono text-[11px] font-black tracking-widest text-black uppercase',
    briefCard:
      'flex items-start gap-4 rounded-none border-4 border-black bg-[#FFFEF0] p-6 shadow-[8px_8px_0_0_#000]',
    briefAvatar:
      'flex size-11 shrink-0 items-center justify-center rounded-none border-2 border-black bg-[#FFFF00] text-black',
    briefBubble:
      'relative min-w-0 flex-1 rounded-none border-2 border-black bg-white px-4 py-3 text-sm font-bold leading-relaxed text-black shadow-[4px_4px_0_0_#000]',
    scene: 'rounded-none border-4 border-black bg-[#FFFF00] p-4 shadow-[10px_10px_0_0_#000] sm:p-6',
  },
  minimal: {
    primaryBtn:
      'rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-normal tracking-wide text-white transition-opacity hover:opacity-80',
    secondaryBtn:
      'rounded-md border border-neutral-200 bg-transparent px-5 py-2.5 text-sm font-normal text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900',
    ghostBtn:
      'rounded-md px-4 py-2 text-sm font-light text-neutral-400 transition-colors hover:text-neutral-700',
    disabledBtn:
      'rounded-md bg-neutral-200 px-5 py-2.5 text-sm font-normal text-neutral-400',
    badgeNew: 'rounded-sm bg-neutral-100 px-2 py-1 text-[11px] font-normal text-neutral-600',
    badgeDraft: 'rounded-sm px-2 py-1 text-[11px] font-light text-neutral-400',
    badgeLive:
      'inline-flex items-center gap-1.5 rounded-sm bg-neutral-50 px-2 py-1 text-[11px] font-normal text-neutral-600',
    badgeLiveDot: 'size-1 rounded-full bg-neutral-400',
    badgeBeta: 'rounded-sm bg-neutral-900 px-2 py-1 text-[11px] font-normal text-white',
    inputLabel: 'text-[11px] font-light uppercase tracking-[0.2em] text-neutral-400',
    input:
      'rounded-md border-0 border-b border-neutral-200 bg-transparent px-0 py-2 text-sm font-light text-neutral-800 outline-none transition-colors focus:border-neutral-800 focus:ring-0',
    readOnlyField:
      'flex flex-1 items-center gap-2 border-b border-neutral-200 px-0 py-2 text-sm font-light text-neutral-400',
    copyBtn:
      'inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm font-light text-neutral-600 transition-colors hover:border-neutral-400',
    tabBar: 'flex min-w-0 gap-3 overflow-x-auto border-b border-neutral-200 bg-transparent p-0',
    tabActive: 'absolute inset-x-0 bottom-0 h-px bg-neutral-900',
    tabInactive: 'text-neutral-400',
    tabPanel: 'mt-6 rounded-none border-0 bg-transparent p-0 text-sm font-light leading-relaxed text-neutral-500',
    accordion: 'w-full divide-y divide-neutral-100 rounded-none border-0 bg-transparent',
    accordionBtn:
      'flex w-full items-center justify-between gap-3 px-0 py-4 text-left text-sm font-normal text-neutral-800',
    accordionContent: 'px-0 pb-4 text-sm font-light leading-relaxed text-neutral-500',
    overlayPrimaryBtn:
      'rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-normal tracking-wide text-white transition-opacity hover:opacity-80',
    overlaySecondaryBtn:
      'rounded-md border border-neutral-200 bg-transparent px-5 py-2.5 text-sm font-normal text-neutral-600 transition-colors hover:border-neutral-400',
    dialogBackdrop:
      'fixed inset-0 z-60 flex items-center justify-center bg-neutral-900/10 p-4 backdrop-blur-[2px]',
    dialog: 'w-full max-w-sm rounded-lg border border-neutral-100 bg-white p-8 shadow-none',
    dialogIcon:
      'flex size-10 items-center justify-center rounded-md bg-neutral-50 text-neutral-700',
    dialogTitle: 'mt-6 font-serif text-2xl font-normal tracking-tight text-neutral-900',
    dialogClose:
      'rounded-md p-1 text-neutral-300 transition-colors hover:text-neutral-600',
    dialogBody: 'mt-3 text-sm font-light leading-relaxed text-neutral-500',
    dialogAction:
      'mt-8 w-full rounded-md bg-neutral-900 py-2.5 text-sm font-normal text-white transition-opacity hover:opacity-80',
    toast:
      'flex items-center gap-3 rounded-md border border-neutral-200 bg-white px-4 py-3 shadow-sm',
    toastIcon:
      'flex size-6 items-center justify-center rounded-md bg-neutral-900 text-white',
    toastText: 'text-sm font-normal text-neutral-900',
    table: 'w-full overflow-x-auto rounded-none border-0 border-t border-neutral-100',
    tableHead:
      'border-b border-neutral-100 bg-transparent text-left text-[10px] font-medium tracking-[0.15em] text-neutral-500 uppercase',
    tableHeadCell: 'px-4 py-3 font-medium whitespace-nowrap text-neutral-500',
    tableCell: 'px-4 py-3 font-normal whitespace-nowrap text-neutral-800',
    tableMutedCell: 'px-4 py-3 whitespace-nowrap text-neutral-500',
    tableRow: 'border-b border-neutral-50 last:border-0 transition-colors hover:bg-neutral-50/80',
    tableBadgeStable: 'rounded-sm bg-neutral-100 px-2 py-0.5 text-[11px] font-normal text-neutral-600',
    tableBadgeBeta: 'rounded-sm px-2 py-0.5 text-[11px] font-light text-neutral-400',
    chartContainer:
      'flex items-end justify-between gap-3 rounded-none border-0 border-t border-neutral-100 bg-transparent px-0 py-6',
    chartBar: 'w-full rounded-sm bg-neutral-200 transition-colors hover:bg-neutral-400',
    chartLabel: 'text-[10px] font-light text-neutral-400',
    demoCard:
      'flex h-full min-h-52 flex-col rounded-lg border border-neutral-100 bg-white p-6 shadow-none',
    demoLabel: 'mb-6 text-[10px] font-light tracking-[0.25em] text-neutral-400 uppercase',
    briefCard: 'flex items-start gap-5 rounded-lg border border-neutral-100 bg-white p-6 shadow-none',
    briefAvatar:
      'flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-50 text-neutral-400',
    briefBubble:
      'relative min-w-0 flex-1 rounded-md bg-neutral-50 px-4 py-3 text-sm font-light leading-relaxed text-neutral-600',
    scene: 'rounded-lg border border-neutral-100 bg-neutral-50/50 p-4 sm:p-6',
  },
}

function themeStyles(theme: ComponentTheme) {
  return THEME_STYLES[theme]
}

/* ---------- Buttons + Badges ---------- */
function ButtonsDemo({ theme }: { theme: ComponentTheme }) {
  const s = themeStyles(theme)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <button className={s.primaryBtn}>Primary</button>
        <button className={s.secondaryBtn}>Secondary</button>
        <button className={s.ghostBtn}>Ghost</button>
        <button disabled className={s.disabledBtn}>
          Disabled
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={s.badgeNew}>New</span>
        <span className={s.badgeDraft}>Draft</span>
        <span className={s.badgeLive}>
          <span className={s.badgeLiveDot} /> Live
        </span>
        <span className={s.badgeBeta}>Beta</span>
      </div>
    </div>
  )
}

/* ---------- Inputs ---------- */
function InputsDemo({ theme }: { theme: ComponentTheme }) {
  const s = themeStyles(theme)
  const [value, setValue] = useState('')
  const [copied, setCopied] = useState(false)
  return (
    <div
      className={`flex w-full max-w-sm flex-col gap-4 ${theme === 'brutalist' ? 'pb-1 pr-1' : ''}`}
    >
      <label className="flex flex-col gap-1.5 text-sm">
        <span className={s.inputLabel}>Email address</span>
        <input
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="you@example.com"
          className={s.input}
        />
      </label>
      <div className="flex min-w-0 items-center gap-2 overflow-visible">
        <div className={s.readOnlyField}>
          <span className="truncate">example.com/portfolio</span>
        </div>
        <button
          onClick={() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1400)
          }}
          className={s.copyBtn}
        >
          {copied ? (
            <Check className={`size-4 ${theme === 'base' ? 'text-primary' : ''}`} />
          ) : (
            <Copy className="size-4" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

/* ---------- Tabs ---------- */
function TabsDemo({ theme }: { theme: ComponentTheme }) {
  const s = themeStyles(theme)
  const tabs = ['Overview', 'Activity', 'Settings']
  const [active, setActive] = useState('Overview')
  return (
    <div className="w-full min-w-0">
      <div className={s.tabBar}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`relative py-1.5 text-sm font-medium transition-colors ${
              theme === 'minimal' ? 'shrink-0 px-1' : 'flex-1 px-3'
            }`}
          >
            {active === t && (
              <motion.span
                layoutId={`tab-pill-${theme}`}
                className={s.tabActive}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span
              className={`relative ${
                active === t
                  ? theme === 'brutalist'
                    ? 'text-[#FFFF00]'
                    : theme === 'glass'
                      ? 'text-white'
                      : theme === 'minimal'
                        ? 'text-neutral-900'
                        : 'text-primary-foreground'
                  : s.tabInactive
              }`}
            >
              {t}
            </span>
          </button>
        ))}
      </div>
      <div className={s.tabPanel}>
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {active === 'Overview' &&
              'Every tab transition uses a shared layout animation for a seamless, connected feel.'}
            {active === 'Activity' && 'Motion communicates state without stealing attention.'}
            {active === 'Settings' && 'Consistent spacing and focus states across the whole system.'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- Accordion ---------- */
function AccordionDemo({ theme }: { theme: ComponentTheme }) {
  const s = themeStyles(theme)
  const items = [
    { q: 'Is it accessible?', a: 'Yes. Keyboard operable, ARIA-labelled, and reduced-motion aware.' },
    { q: 'Is it themeable?', a: 'Every value is a design token, so light and dark just work.' },
    { q: 'Is it fast?', a: 'Animations are GPU-friendly and components lazy-load where it counts.' },
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className={s.accordion}>
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className={s.accordionBtn}
          >
            {item.q}
            <ChevronDown
              className={`size-4 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''} ${
                theme === 'brutalist' ? 'text-black' : 'text-muted-foreground'
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className={s.accordionContent}>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ---------- Dialog + Toast ---------- */
function OverlaysDemo({ theme }: { theme: ComponentTheme }) {
  const s = themeStyles(theme)
  const [dialog, setDialog] = useState(false)
  const [toast, setToast] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function fireToast() {
    setToast(true)
    setTimeout(() => setToast(false), 2600)
  }

  const overlays =
    mounted &&
    createPortal(
      <>
        <AnimatePresence>
          {dialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDialog(false)}
              className={s.dialogBackdrop}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Example dialog"
                className={s.dialog}
              >
                <div className="flex items-start justify-between">
                  <div className={s.dialogIcon}>
                    <Sparkles className="size-5" />
                  </div>
                  <button
                    onClick={() => setDialog(false)}
                    aria-label="Close dialog"
                    className={s.dialogClose}
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <h4 className={s.dialogTitle}>The details matter</h4>
                <p className={s.dialogBody}>
                  Focus is trapped, escape closes, and the backdrop dims. Small things, done right.
                </p>
                <button onClick={() => setDialog(false)} className={s.dialogAction}>
                  Got it
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pointer-events-none fixed bottom-6 right-6 z-60">
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className={`pointer-events-auto ${s.toast}`}
              >
                <span className={s.toastIcon}>
                  <Check className="size-3.5" />
                </span>
                <span className={s.toastText}>Saved to your workspace</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>,
      document.body,
    )

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => setDialog(true)} className={s.overlayPrimaryBtn}>
        Open dialog
      </button>
      <button onClick={fireToast} className={s.overlaySecondaryBtn}>
        Trigger toast
      </button>
      {overlays}
    </div>
  )
}

/* ---------- Table ---------- */
function TableDemo({ theme }: { theme: ComponentTheme }) {
  const s = themeStyles(theme)
  const rows = [
    { name: 'Buttons', usage: '128', status: 'Stable' },
    { name: 'Inputs', usage: '96', status: 'Stable' },
    { name: 'Charts', usage: '41', status: 'Beta' },
  ]
  return (
    <div className={s.table}>
      <table className="w-full min-w-[16rem] text-sm">
        <thead>
          <tr className={s.tableHead}>
            <th className={s.tableHeadCell}>Component</th>
            <th className={s.tableHeadCell}>Usage</th>
            <th className={s.tableHeadCell}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className={s.tableRow}>
              <td className={s.tableCell}>{r.name}</td>
              <td className={s.tableMutedCell}>{r.usage}</td>
              <td className={s.tableCell}>
                <span className={r.status === 'Stable' ? s.tableBadgeStable : s.tableBadgeBeta}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------- Chart ---------- */
function ChartDemo({ theme }: { theme: ComponentTheme }) {
  const s = themeStyles(theme)
  const data = [42, 58, 51, 70, 64, 88, 79]
  const max = Math.max(...data)
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <div className="w-full">
      <div className={s.chartContainer}>
        {data.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(v / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={s.chartBar}
              />
            </div>
            <span className={s.chartLabel}>{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function buildDemos(theme: ComponentTheme) {
  return [
    { id: 'Buttons', node: <ButtonsDemo theme={theme} /> },
    { id: 'Inputs', node: <InputsDemo theme={theme} /> },
    { id: 'Tabs', node: <TabsDemo theme={theme} /> },
    { id: 'Accordion', node: <AccordionDemo theme={theme} /> },
    { id: 'Overlays', node: <OverlaysDemo theme={theme} /> },
    { id: 'Table', node: <TableDemo theme={theme} /> },
    { id: 'Charts', node: <ChartDemo theme={theme} /> },
  ]
}

const CLIENT_TABS = [
  {
    id: 'client-a',
    label: 'Client A',
    theme: 'glass' as const,
    message: 'Im looking for Apple Glassmorphism UI components',
  },
  {
    id: 'client-b',
    label: 'Client B',
    theme: 'brutalist' as const,
    message: 'Im looking for Bold Brutalist UI components',
  },
  {
    id: 'client-c',
    label: 'Client C',
    theme: 'minimal' as const,
    message: 'Im looking for Clean Minimalist UI components',
  },
] as const

type LibraryView = (typeof CLIENT_TABS)[number]['id'] | 'base'

function ClientBrief({ message, theme }: { message: string; theme: ComponentTheme }) {
  const s = themeStyles(theme)
  return (
    <Reveal className="mx-auto w-full max-w-2xl">
      <div className={s.briefCard}>
        <div className={s.briefAvatar}>
          <User className="size-5" aria-hidden />
        </div>
        <div className={s.briefBubble}>
          <span className="sr-only">Client request: </span>
          {message}
        </div>
      </div>
    </Reveal>
  )
}

function DemoGrid({ theme }: { theme: ComponentTheme }) {
  const s = themeStyles(theme)
  const demos = buildDemos(theme)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {demos.map((d, i) => (
        <Reveal
          key={d.id}
          delay={i * 0.05}
          className={
            d.id === 'Buttons' || d.id === 'Charts' ? 'sm:col-span-2 lg:col-span-2' : ''
          }
        >
          <div className={s.demoCard}>
            <span className={s.demoLabel}>{d.id}</span>
            <div
              className={`flex min-w-0 flex-1 ${
                d.id === 'Table' || d.id === 'Inputs' || d.id === 'Tabs'
                  ? 'items-start overflow-visible'
                  : 'items-center'
              }`}
            >
              {d.node}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export function ComponentLibrary() {
  const [view, setView] = useState<LibraryView>('base')
  const activeClient = CLIENT_TABS.find((tab) => tab.id === view)
  const activeTheme: ComponentTheme = activeClient?.theme ?? 'base'

  return (
    <section id="components" className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
      <SectionHeading
        index="02"
        kicker="Design System"
        title="A living component library."
        description="Real, interactive primitives: accessible, themeable, and consistent. Try them."
      />

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-full border border-border bg-card p-1">
          {CLIENT_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setView(tab.id)}
              className="relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4"
            >
              {view === tab.id && (
                <motion.span
                  layoutId="library-client-tab"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              <span
                className={`relative ${view === tab.id ? 'text-primary-foreground' : 'text-muted-foreground'}`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setView('base')}
          className="relative self-start rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors sm:self-auto"
        >
          {view === 'base' && (
            <motion.span
              layoutId="library-base-tab"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            />
          )}
          <span className={`relative ${view === 'base' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
            Base Components
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={activeClient ? themeStyles(activeTheme).scene : undefined}
        >
          {activeClient && (
            <div className="mb-6">
              <ClientBrief message={activeClient.message} theme={activeTheme} />
            </div>
          )}
          <DemoGrid theme={activeTheme} />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
