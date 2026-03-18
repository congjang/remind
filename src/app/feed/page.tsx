"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardOneLineHor } from "../components/Card";
import { Calendar, type CalendarViewMode } from "../components/Calendar";
import { TopNavBar } from "../components/TopNavBar";
import { BottomNavBar } from "../components/BottomNavBar";
import { getRecords, type StoredRecord } from "../lib/recordsStore";

type FeedRecord = {
  id: string;
  timeLabel: string;
  content: string;
};

function toYmd(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function daysUntil(ymd: string) {
  const [y, m, d] = ymd.split("-").map((v) => Number(v));
  const due = new Date(y, (m ?? 1) - 1, d ?? 1);
  due.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((due.getTime() - today.getTime()) / 86400000);
}

function truncateLabel(s: string) {
  const t = s.trim();
  if (t.length <= 10) return t;
  return `${t.slice(0, 10)}…`;
}

function formatDueLabel(ymd: string) {
  const d = daysUntil(ymd);
  if (d < 0) return "지남";
  if (d === 0) return "오늘";
  if (d === 1) return "D-1";
  if (d <= 7) return `D-${d}`;
  return String(d);
}

export default function FeedPage() {
  const [calendarView, setCalendarView] = useState<CalendarViewMode>("month");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 11, 16));
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [storedRecords, setStoredRecords] = useState<StoredRecord[]>([]);

  // 기록하기에서 저장된 기록(localStorage)을 반영
  useEffect(() => {
    setStoredRecords(getRecords());
  }, []);

  const recordsByDate = useMemo<Record<string, FeedRecord[]>>(() => {
    // 기존 샘플(디자인용) 데이터는 유지
    const base: Record<string, FeedRecord[]> = {
      "2024-12-16": [
        {
          id: "r1",
          timeLabel: "오전 11:57",
          content: "눈 언제까지 오려고 이러나...ㅎ...안에서 보기에는 예쁜데 이따 퇴근이 걱정이다 정말 어떡해☺️",
        },
        {
          id: "r2",
          timeLabel: "오전 11:57",
          content: "아니 갑자기 왜 눈이 오는거야ㅠㅠ 집에 어떻게 가냐고",
        },
        {
          id: "r3",
          timeLabel: "아침 08:57",
          content: "왠지 기분이 좋아",
        },
      ],
      "2024-12-02": [
        {
          id: "r4",
          timeLabel: "오후 16:12",
          content: "사과를 먹었다. 아침엔 역시 사과다. 건강해지는 기분이 든다.헤헿.",
        },
      ],
    };

    storedRecords.forEach((r) => {
      const created = new Date(r.createdAt);
      const key = toYmd(created);
      const timeLabel = created.toLocaleTimeString("ko-KR", {
        hour: "numeric",
        minute: "2-digit",
      });

      if (!base[key]) base[key] = [];
      base[key].unshift({ id: r.id, timeLabel, content: r.text });
    });

    return base;
  }, [storedRecords]);

  useEffect(() => {
    setIsLoadingRecords(true);
    const t = setTimeout(() => setIsLoadingRecords(false), 260);
    return () => clearTimeout(t);
  }, [calendarView, selectedDate]);

  const ymd = toYmd(selectedDate);
  const records = recordsByDate[ymd] ?? [];

  const todoForTopCard = storedRecords.find((r) => Boolean(r.isTodo) && Boolean(r.dueDate));
  const topCard =
    todoForTopCard && todoForTopCard.dueDate
      ? {
          label: truncateLabel(todoForTopCard.text) || "할 일",
          date: formatDueLabel(todoForTopCard.dueDate),
        }
      : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <main className="relative flex h-[100dvh] max-h-[844px] md:max-h-[1024px] w-full max-w-[390px] md:max-w-[744px] flex-col overflow-hidden rounded-3xl bg-[var(--colorBackgroundBase2Default,#f2f2f3)] shadow-xl">
        {/* 최상단 D-day 카드: (할 일 체크 + 마감일 설정)된 기록이 있을 때만 표기 */}
        {topCard && (
          <div className="px-6 pt-4">
            <CardOneLineHor label={topCard.label} date={topCard.date} />
          </div>
        )}

        {/* 그 다음 TopNav — (date+viewmode 타입) */}
        <div className={`px-6 ${topCard ? "pt-2" : "pt-4"}`}>
          <TopNavBar
            type="date+viewmode"
            date="2024.12.02"
            viewMode={calendarView}
            onLeadingClick={() =>
              setSelectedDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1))
            }
            onTrailingClick={() =>
              setSelectedDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1))
            }
            onViewModeToggle={() => setCalendarView((v) => (v === "month" ? "week" : "month"))}
          />
        </div>

        {/* 본문 컨테이너 */}
        <div className="flex flex-1 flex-col gap-6 px-6 py-6">
          {/* Calendar (month/week variants) */}
          <div className="flex w-full justify-center">
            <Calendar
              view={calendarView}
              value={selectedDate}
              todayOverride={new Date(2024, 11, 16)}
              onChangeDate={setSelectedDate}
              renderDayDot={(date) => {
                const key = toYmd(date);
                return (recordsByDate[key]?.length ?? 0) > 0;
              }}
              className="bg-transparent p-0 rounded-none"
            />
          </div>

          {/* 오늘의 새 기록 CTA — 전용 컴포넌트가 아직 없으므로 static red 컨테이너 */}
          <div className="rounded-2xl bg-red-200 px-5 py-3" role="button" tabIndex={0}>
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--colorButtonContainerHighlightDefault,#ffffff1a)]">
                <span className="block h-3 w-3 rounded bg-red-400" />
              </span>
              <span className="font-[family-name:var(--Typography-font-family)] text-[length:var(--Typography-font-size-Label-M,16px)] font-semibold text-[var(--colorElementOnContainerSecondaryDefault,#26272a)]">
                오늘의 새 기록
              </span>
            </div>
          </div>

          {/* 기록 카드 리스트 — 아직 전용 2line 카드 컴포넌트가 없으므로 red 컨테이너로 표시 */}
          <div className="space-y-1">
            {isLoadingRecords ? (
              <div className="rounded-2xl bg-red-200 px-4 py-6">
                <div className="h-4 w-24 rounded bg-red-300" />
                <div className="mt-3 h-4 w-full rounded bg-red-300" />
                <div className="mt-2 h-4 w-4/5 rounded bg-red-300" />
              </div>
            ) : (
              records.map((item) => (
                <Card key={item.id} className="bg-red-200">
                  <div className="mb-1 flex items-center gap-2 text-[length:var(--Typography-font-size-Label-XS,12px)] font-semibold text-[var(--colorElementBase3Default,#8f9099)]">
                    <span>{item.timeLabel}</span>
                    <span className="inline-flex h-4 w-4 rounded bg-red-300" />
                  </div>
                  <p className="text-[16px] font-semibold leading-[1.6] text-[var(--colorElementBase1Default,#35363b)]">
                    {item.content}
                  </p>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* 하단 내비게이션 (기존 BottomNavBar 재사용) */}
        <BottomNavBar active="feed" onChange={() => {}} />
      </main>
    </div>
  );
}

