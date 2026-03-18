"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { TopNavBar } from "./components/TopNavBar";
import { CardOneLineWithIcon } from "./components/Card";
import { List } from "./components/List";
import { Button } from "./components/Button";
import { EmotionIcon } from "./components/EmotionIcon";
import { ToastMessage } from "./components/ToastMessage";
import type { EmotionIconName } from "../icons";
import { saveRecord } from "./lib/recordsStore";

function addDaysYmd(daysToAdd: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysToAdd);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function ymdToDot(ymd: string) {
  return `${ymd.slice(0, 4)}.${ymd.slice(5, 7)}.${ymd.slice(8, 10)}`;
}

export default function Home() {
  const router = useRouter();

  const [text, setText] = useState("");
  const maxLength = 500;
  const charCount = text.length;
  const isEmpty = text.trim().length === 0;

  const [isEditing, setIsEditing] = useState(false);
  const [todoOn, setTodoOn] = useState(false);
  const [dueDate, setDueDate] = useState<string | null>(null); // YYYY-MM-DD
  const [emotion, setEmotion] = useState<EmotionIconName>("happiness");
  const [toastVisible, setToastVisible] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayTextareaRef = useRef<HTMLTextAreaElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // textarea 높이를 내용에 맞춰 자동 확장
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 73)}px`;
  }, [text]);

  // 편집 모드 진입 시 오버레이 textarea에 포커스
  useEffect(() => {
    if (isEditing && overlayTextareaRef.current) {
      overlayTextareaRef.current.focus();
    }
  }, [isEditing]);

  // 언마운트 시 토스트 타이머 정리
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // 할 일 OFF되면 마감일도 초기화
  useEffect(() => {
    if (!todoOn) setDueDate(null);
  }, [todoOn]);

  const cycleDueDate = () => {
    const options = [1, 3, 7, 14].map(addDaysYmd);
    if (!dueDate) {
      setDueDate(options[0] ?? null);
      return;
    }
    const idx = options.indexOf(dueDate);
    const next = options[(idx + 1) % options.length] ?? options[0] ?? null;
    setDueDate(next);
  };

  const handleSave = () => {
    if (isEmpty) return;
    const payload = text.trim();
    saveRecord({
      text: payload,
      isTodo: todoOn,
      dueDate: todoOn ? dueDate : null,
    });
    setToastVisible(true);

    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
      router.push("/feed");
    }, 900);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <main className="relative flex h-[100dvh] max-h-[844px] md:max-h-[1024px] w-full max-w-[390px] md:max-w-[744px] flex-col overflow-hidden rounded-3xl bg-[color:var(--colorBackgroundBase2Default,#f2f2f3)] shadow-xl">
        {/* Top nav */}
        <div
          className={`transition-opacity duration-200 ease-out ${
            isEditing ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <TopNavBar
            type="Large title"
            headline="오늘의 기록"
            date={new Date().toLocaleDateString("ko-KR", {
              month: "long",
              day: "numeric",
              weekday: "short",
            })}
            weatherLocation="서대문구 연희동"
            weatherTemp="-1°C"
            weatherExtra="미세먼지 좋음"
          />
        </div>

        {/* 본문 */}
        <div className="flex flex-1 flex-col gap-2 px-6 py-3">
          {/* 감정 카드 */}
          <button
            type="button"
            className="text-left"
            onClick={() => {
              const order: EmotionIconName[] = ["happiness", "sad", "angry", "Calmness"];
              const idx = order.indexOf(emotion);
              const next = order[(idx + 1) % order.length] ?? "happiness";
              setEmotion(next);
            }}
          >
            <CardOneLineWithIcon emotion={<EmotionIcon name={emotion} />} />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            {!isEditing && (
              <motion.section
                key="base-textfield"
                layoutId="textfield"
                className="relative flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[16px] bg-[color:var(--colorBackgroundBase1Default,#ffffff)] px-6 py-6"
                onClick={() => setIsEditing(true)}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative flex min-h-full min-w-full flex-col items-center justify-center">
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, maxLength))}
                    rows={2}
                    className="min-h-[73px] w-full resize-none border-none bg-transparent font-[family-name:var(--Typography-font-family)] text-[length:var(--Typography-font-size-Headline-M,28px)] font-bold leading-[1.3] text-center text-[color:var(--colorElementBase1Default,#35363b)] outline-none"
                  />
                  {text.length === 0 && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <p className="whitespace-pre-line font-[family-name:var(--Typography-font-family)] text-[length:var(--Typography-font-size-Headline-M,28px)] font-bold leading-[1.3] text-center text-[color:var(--colorElementBase1Disabled,rgba(0,0,0,0.3))]">
                        {"지금 떠오른 문장은\n무엇인가요?"}
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className={`pointer-events-none absolute bottom-4 right-6 font-[family-name:var(--Typography-font-family)] text-[length:var(--Typography-font-size-Caption-M,10px)] ${
                    charCount >= maxLength - 50
                      ? "text-[color:var(--colorElementWarningDefault,#b3261e)]"
                      : "text-[color:var(--colorElementBase1Disabled,rgba(0,0,0,0.3))]"
                  }`}
                >
                  {charCount}/{maxLength}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* 할 일로 전환 */}
          <section className="space-y-2 rounded-2xl bg-[color:var(--colorBackgroundBase1Default,#ffffff)] px-2 py-2">
            <List
              items={[
                {
                  id: "convert-todo",
                  variant: "labelCheck",
                  size: "M",
                  label: "할 일인가요?",
                  checked: todoOn,
                  onCheckChange: setTodoOn,
                },
              ]}
            />
            {todoOn && (
              <div className="mt-2 space-y-1 rounded-2xl bg-[color:var(--colorBackgroundBase1Default,#ffffff)] px-2 py-2">
                <List
                  items={[
                    {
                      id: "todo-deadline",
                      variant: "labelLabel",
                      size: "M",
                      label: "마감일",
                      secondaryLabel: dueDate ? ymdToDot(dueDate) : "설정",
                      onClick: cycleDueDate,
                    },
                    {
                      id: "todo-reminder",
                      variant: "labelOnly",
                      size: "M",
                      label: "알림 / 시간 선택 (예정)",
                    },
                  ]}
                />
              </div>
            )}
          </section>
        </div>

        {/* 하단 버튼 */}
        <div className="px-6 pb-6 pt-3">
          <Button
            size="L"
            variant="contained"
            level="primary"
            fullWidth
            disabled={isEmpty}
            className={
              isEmpty
                ? "bg-[color:var(--colorButtonContainerPrimaryDisabled,rgba(0,0,0,0.2))] text-[color:var(--colorElementOnContainerHighlightDisabled,rgba(255,255,255,0.3))]"
                : undefined
            }
            onClick={handleSave}
          >
            기록 저장하기
          </Button>
        </div>

        {/* 텍스트 편집 오버레이 (기존 레이아웃 유지) */}
        {isEditing && (
          <div className="absolute inset-0 z-20 flex flex-col bg-transparent">
            <div className="pt-[21px]">
              <div className="flex items-center justify-between px-4 pb-2">
                <span className="font-[family-name:var(--Typography-font-family)] text-[17px] leading-[22px] text-black">
                  9:41
                </span>
                <div className="flex items-center gap-2 text-black/80 text-[10px]">
                  <span>●●●</span>
                  <span>▂▃▅</span>
                  <span>🔋</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-6 py-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-[10px] bg-[color:var(--colorBackgroundBase2Default,#f2f2f3)]"
                  >
                    <span className="h-6 w-6 rounded-md bg-zinc-400" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-[10px] bg-[color:var(--colorBackgroundBase2Default,#f2f2f3)]"
                  >
                    <span className="h-6 w-6 rounded-md bg-zinc-400" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-[10px] bg-[color:var(--colorBackgroundBase2Default,#f2f2f3)]"
                  >
                    <span className="h-6 w-6 rounded-md bg-zinc-400" aria-hidden />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex h-12 items-center justify-center rounded-[12px] bg-[color:var(--colorButtonContainerHighlightDefault,rgba(255,255,255,0.1))] px-4"
                >
                  <span className="font-[family-name:var(--Typography-font-family)] text-[length:var(--Typography-font-size-Label-M,16px)] font-semibold leading-[1.2] text-[color:var(--colorElementOnContainerPrimaryDefault,#03584d)]">
                    완료
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-1 flex-col bg-transparent">
              <motion.section
                key="edit-textfield"
                layoutId="textfield"
                className="relative flex flex-1 flex-col rounded-[16px] bg-[color:var(--colorBackgroundBase1Default,#ffffff)] px-6 py-6"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative flex min-h-full min-w-full flex-col items-center justify-center">
                  <textarea
                    ref={overlayTextareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, maxLength))}
                    rows={2}
                    className="min-h-[73px] w-full resize-none border-none bg-transparent font-[family-name:var(--Typography-font-family)] text-[length:var(--Typography-font-size-Headline-M,28px)] font-bold leading-[1.3] text-center text-[color:var(--colorElementBase1Default,#35363b)] outline-none"
                  />
                </div>
                <div
                  className={`pointer-events-none absolute bottom-4 right-6 font-[family-name:var(--Typography-font-family)] text-[length:var(--Typography-font-size-Caption-M,10px)] ${
                    charCount >= maxLength - 50
                      ? "text-[color:var(--colorElementWarningDefault,#b3261e)]"
                      : "text-[color:var(--colorElementBase1Disabled,rgba(0,0,0,0.3))]"
                  }`}
                >
                  {charCount}/{maxLength}
                </div>
              </motion.section>
            </div>

            <div className="flex h-[336px] flex-col justify-end">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-[rgba(85,85,85,0.9)] mix-blend-luminosity" />
                <div className="absolute inset-0 bg-[rgba(86,88,92,0.87)]" />
                <div className="absolute inset-0 bg-[#939393]/70 backdrop-blur-[40px]" />

                <div className="relative z-10 flex h-full flex-col justify-end pb-4">
                  <div className="mx-2 mb-2 flex h-10 items-center justify-between rounded-lg bg-black/10 px-3 text-[15px] text-white/90">
                    <span>“The”</span>
                    <span>the</span>
                    <span>to</span>
                  </div>

                  <div className="space-y-2 px-2 text-[19px] font-normal text-black">
                    <div className="flex gap-1">
                      {"QWERTYUIOP".split("").map((ch) => (
                        <button
                          key={`k1-${ch}`}
                          type="button"
                          className="flex h-10 flex-1 items-center justify-center rounded-[4.6px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.35)]"
                        >
                          {ch.toLowerCase()}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-1 px-3">
                      {"ASDFGHJKL".split("").map((ch) => (
                        <button
                          key={`k2-${ch}`}
                          type="button"
                          className="flex h-10 flex-1 items-center justify-center rounded-[4.6px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.35)]"
                        >
                          {ch.toLowerCase()}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-1 px-5">
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-[4.6px] bg-[#8f8f8f] text-white shadow-[0_1px_0_rgba(0,0,0,0.35)]"
                      >
                        ⇧
                      </button>
                      {"ZXCVBNM".split("").map((ch) => (
                        <button
                          key={`k3-${ch}`}
                          type="button"
                          className="flex h-10 flex-1 items-center justify-center rounded-[4.6px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.35)]"
                        >
                          {ch.toLowerCase()}
                        </button>
                      ))}
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-[4.6px] bg-[#8f8f8f] text-white shadow-[0_1px_0_rgba(0,0,0,0.35)]"
                      >
                        ⌫
                      </button>
                    </div>
                    <div className="flex gap-1 px-2">
                      <button
                        type="button"
                        className="flex h-10 w-14 items-center justify-center rounded-[4.6px] bg-[#8f8f8f] text-[16px] text-white shadow-[0_1px_0_rgba(0,0,0,0.35)]"
                      >
                        123
                      </button>
                      <button
                        type="button"
                        className="flex h-10 flex-1 items-center justify-center rounded-[4.6px] bg-white text-[16px] text-black shadow-[0_1px_0_rgba(0,0,0,0.35)]"
                      >
                        space
                      </button>
                      <button
                        type="button"
                        className="flex h-10 w-14 items-center justify-center rounded-[4.6px] bg-[#8f8f8f] text-[16px] text-white shadow-[0_1px_0_rgba(0,0,0,0.35)]"
                      >
                        Enter
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between px-6 text-white">
                    <span className="text-2xl">😊</span>
                    <span className="text-xl">🎤</span>
                  </div>
                  <div className="mt-2 flex items-center justify-center pb-2">
                    <div className="h-[5px] w-[144px] rounded-full bg-black/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {toastVisible && (
          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center">
            <ToastMessage label="저장되었습니다" variant="labelOnly" />
          </div>
        )}
      </main>
    </div>
  );
}