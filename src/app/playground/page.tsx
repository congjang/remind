'use client';

import { Button, type ButtonProps } from "../components/Button";
import { ButtonSet } from "../components/ButtonSet";
import { Checkbox } from "../components/Checkbox";
import { Radio } from "../components/Radio";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { TopNavBar, type TopNavBarType } from "../components/TopNavBar";
import { List } from "../components/List";
import { Card, CardOneLineWithIcon, CardOneLineHor } from "../components/Card";
import { EmotionIcon } from "../components/EmotionIcon";
import { Calendar } from "../components/Calendar";
import { ToastMessage, type ToastMessageVariant } from "../components/ToastMessage";
import { FunctionalIconGrid } from "../components/FunctionalIconGrid";
import { WeatherIconGrid } from "../components/WeatherIconGrid";
import { EmotionIconGrid } from "../components/EmotionIconGrid";
import { CalendarDay, type CalendarDayState } from "../components/CalendarDay";
import type { SelectionMode } from "../components/CalendarMonth";
import { Fab } from "../components/Fab";
import { BottomNavBar, type BottomNavKey } from "../components/BottomNavBar";
import type { ButtonSetSize } from "../components/ButtonSet";
import type { FabVariant, FabSize } from "../components/Fab";
import type { ListItemVariant, ListItemSize } from "../components/ListItem";
import { ButtonLeadingIcon, ButtonTrailingIcon } from "../../icons/ButtonIcons";
import type { EmotionIconName } from "../../icons";
import { useState } from "react";

export default function PlaygroundPage() {
  const [doneToday, setDoneToday] = useState(false);
  const [notifyOn, setNotifyOn] = useState(true);
  const [radioValue, setRadioValue] = useState("option1");
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());
  const [calendarSelectionMode, setCalendarSelectionMode] =
    useState<SelectionMode>("single");
  const [calendarRangeStart, setCalendarRangeStart] = useState<Date | null>(null);
  const [calendarRangeEnd, setCalendarRangeEnd] = useState<Date | null>(null);
  /** 테스트용: 이 날짜를 '오늘'로 표시 (YYYY-MM-DD, 비우면 실제 오늘) */
  const [calendarTodayOverride, setCalendarTodayOverride] = useState<string>("");
  /** 일정 있는 날 (도트 표시) YYYY-MM-DD 목록 — 기본 예시 포함 */
  const [calendarDotDates, setCalendarDotDates] = useState<string[]>([
    "2025-03-05",
    "2025-03-12",
  ]);
  const [dayState, setDayState] = useState<CalendarDayState>("enable");
  const [dayShowRecorded, setDayShowRecorded] = useState(false);
  const [buttonVariant, setButtonVariant] =
    useState<ButtonProps["variant"]>("contained");
  const [buttonLevel, setButtonLevel] =
    useState<ButtonProps["level"]>("primary");
  const [buttonSize, setButtonSize] = useState<ButtonProps["size"]>("M");
  const [buttonLeadingIcon, setButtonLeadingIcon] = useState(true);
  const [buttonTrailingIcon, setButtonTrailingIcon] = useState(false);
  const [buttonFullWidth, setButtonFullWidth] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [toggleSOff, setToggleSOff] = useState(false);
  const [toggleSOn, setToggleSOn] = useState(true);
  const [toggleMOff, setToggleMOff] = useState(false);
  const [toggleMOn, setToggleMOn] = useState(true);
  const [toggleLOff, setToggleLOff] = useState(false);
  const [toggleLOn, setToggleLOn] = useState(true);
  const [buttonSetSize, setButtonSetSize] = useState<ButtonSetSize>("L");
  const [buttonSetHasTwo, setButtonSetHasTwo] = useState(true);
  const [buttonSetPrimaryLabel, setButtonSetPrimaryLabel] = useState("확인");
  const [buttonSetSecondaryLabel, setButtonSetSecondaryLabel] = useState("취소");
  const [buttonSetPrimaryVariant, setButtonSetPrimaryVariant] =
    useState<ButtonProps["variant"]>("contained");
  const [buttonSetPrimaryLevel, setButtonSetPrimaryLevel] =
    useState<ButtonProps["level"]>("primary");
  const [buttonSetSecondaryVariant, setButtonSetSecondaryVariant] =
    useState<ButtonProps["variant"]>("outlined");
  const [buttonSetSecondaryLevel, setButtonSetSecondaryLevel] =
    useState<ButtonProps["level"]>("secondary");
  const [buttonSetFullWidth, setButtonSetFullWidth] = useState(false);
  const [fabVariant, setFabVariant] = useState<FabVariant>("primary");
  const [fabSize, setFabSize] = useState<FabSize>("L");
  const [fabFixed, setFabFixed] = useState(false);
  /** List 테스트 */
  const [listVariant, setListVariant] = useState<ListItemVariant>("labelOnly");
  const [listSize, setListSize] = useState<ListItemSize>("M");
  const [listLabel, setListLabel] = useState("라벨 텍스트");
  const [listSecondaryLabel, setListSecondaryLabel] = useState("2024.11.30");
  const [listChecked, setListChecked] = useState(false);
  const [listSwitchChecked, setListSwitchChecked] = useState(false);
  const [listSelected, setListSelected] = useState(false);
  const [listActiveId, setListActiveId] = useState<string | undefined>("1");
  /** Toast 테스트 */
  const [toastLabel, setToastLabel] = useState("저장되었습니다");
  const [toastAction, setToastAction] = useState("실행 취소");
  const [toastVariant, setToastVariant] =
    useState<ToastMessageVariant>("labelAction");
  /** Functional 아이콘 테스트: 사이즈(px), 컬러(hex) */
  const [functionalIconSize, setFunctionalIconSize] = useState(24);
  const [functionalIconColor, setFunctionalIconColor] = useState("#35363a");
  /** Weather / Emotion 아이콘 테스트: 사이즈(px) */
  const [weatherIconSize, setWeatherIconSize] = useState(24);
  const [emotionIconSize, setEmotionIconSize] = useState(24);
  /** 컬러 테마: true = 다크, false = 라이트 */
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  /** Bottom Nav 활성 탭 */
  const [bottomNav, setBottomNav] = useState<BottomNavKey>("feed");
  /** Top Nav Bar 테스트 */
  const [topNavType, setTopNavType] = useState<TopNavBarType>("Profile");
  const [topNavDate, setTopNavDate] = useState("2025.03.12");
  const [topNavHeadline, setTopNavHeadline] = useState("타이틀");
  const [topNavShowButtons, setTopNavShowButtons] = useState(true);
  const [topNavSubActionLabel, setTopNavSubActionLabel] = useState("저장");
  const [topNavWeatherLocation, setTopNavWeatherLocation] = useState("서울시 중구");
  const [topNavWeatherTemp, setTopNavWeatherTemp] = useState("-1°C");
  const [topNavWeatherExtra, setTopNavWeatherExtra] = useState("미세먼지 좋음");
  /** Card 테스트 */
  const [cardLabel, setCardLabel] = useState("오늘 하루를 한 줄로 요약한다");
  const [cardShowChevron, setCardShowChevron] = useState(true);
  const [cardEmotionName, setCardEmotionName] = useState<EmotionIconName | "">("happiness");
  const [cardHorLabel, setCardHorLabel] = useState("D-day 카드");
  const [cardHorDate, setCardHorDate] = useState("24");
  /** 오늘의 회고 / 내일의 목표 (하단 List) 토글 상태 */
  const [bottomTodayReviewOn, setBottomTodayReviewOn] = useState(false);
  const [bottomTomorrowGoalOn, setBottomTomorrowGoalOn] = useState(false);

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-zinc-50 ${isDarkTheme ? "playground-theme-dark" : ""}`}
    >
      <main className="flex h-[100dvh] max-h-[720px] md:max-h-[900px] w-full max-w-[420px] md:max-w-[744px] flex-col overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="playground-placeholder-token flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-3">
          {/* Top Nav Bar — MCP 스펙 기반, type별 1:1 */}
          <section className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <h2 className="text-xs font-semibold text-zinc-600">Top Nav Bar</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-1.5">
                <span>type</span>
                <select
                  value={topNavType}
                  onChange={(e) => setTopNavType(e.target.value as TopNavBarType)}
                  className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs"
                >
                  <option value="Profile">Profile</option>
                  <option value="Large title">Large title</option>
                  <option value="Small title">Small title</option>
                  <option value="Sub">Sub</option>
                  <option value="Popup">Popup</option>
                  <option value="date+viewmode">date+viewmode</option>
                </select>
              </label>
              <label className="flex items-center gap-1.5">
                <span>date</span>
                <input
                  type="text"
                  value={topNavDate}
                  onChange={(e) => setTopNavDate(e.target.value)}
                  className="w-28 rounded border border-zinc-300 bg-white px-2 py-1 text-xs"
                />
              </label>
              <label className="flex items-center gap-1.5">
                <span>headline</span>
                <input
                  type="text"
                  value={topNavHeadline}
                  onChange={(e) => setTopNavHeadline(e.target.value)}
                  className="w-24 rounded border border-zinc-300 bg-white px-2 py-1 text-xs"
                />
              </label>
              {topNavType === "Sub" && (
                <label className="flex items-center gap-1.5">
                  <Checkbox
                    checked={topNavShowButtons}
                    onChange={(e) => setTopNavShowButtons(e.target.checked)}
                  />
                  <span>showButtons</span>
                </label>
              )}
              {topNavType === "Sub" && (
                <label className="flex items-center gap-1.5">
                  <span>subActionLabel</span>
                  <input
                    type="text"
                    value={topNavSubActionLabel}
                    onChange={(e) => setTopNavSubActionLabel(e.target.value)}
                    className="w-20 rounded border border-zinc-300 bg-white px-2 py-1 text-xs"
                  />
                </label>
              )}
              {(topNavType === "Large title" || topNavType === "Small title" || topNavType === "Popup") && (
                <>
                  <label className="flex items-center gap-1.5">
                    <span>weatherLocation</span>
                    <input
                      type="text"
                      value={topNavWeatherLocation}
                      onChange={(e) => setTopNavWeatherLocation(e.target.value)}
                      className="w-24 rounded border border-zinc-300 bg-white px-2 py-1 text-xs"
                    />
                  </label>
                  <label className="flex items-center gap-1.5">
                    <span>weatherTemp</span>
                    <input
                      type="text"
                      value={topNavWeatherTemp}
                      onChange={(e) => setTopNavWeatherTemp(e.target.value)}
                      className="w-16 rounded border border-zinc-300 bg-white px-2 py-1 text-xs"
                    />
                  </label>
                  <label className="flex items-center gap-1.5">
                    <span>weatherExtra</span>
                    <input
                      type="text"
                      value={topNavWeatherExtra}
                      onChange={(e) => setTopNavWeatherExtra(e.target.value)}
                      className="w-24 rounded border border-zinc-300 bg-white px-2 py-1 text-xs"
                    />
                  </label>
                </>
              )}
            </div>
            <div className="rounded-lg bg-white p-3">
              <TopNavBar
                type={topNavType}
                date={topNavDate}
                headline={topNavHeadline}
                showButtons={topNavShowButtons}
                subActionLabel={topNavSubActionLabel}
                onSubActionClick={() => {}}
                weatherLocation={topNavWeatherLocation}
                weatherTemp={topNavWeatherTemp}
                weatherExtra={topNavWeatherExtra}
                onLeadingClick={() => {}}
                onTrailingClick={() => {}}
              />
            </div>
          </section>

          {/* 컬러 테마 전환 — Figma 변수 모드 추가 후 테스트 예정, 현재 disabled */}
          <section className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50/60 p-3 opacity-75">
            <h2 className="text-xs font-semibold text-zinc-600">테마</h2>
            <ToggleSwitch
              size="M"
              checked={isDarkTheme}
              onChange={setIsDarkTheme}
              disabled
              label={<span className="text-sm font-medium">다크 테마</span>}
              description={
                <span className="text-xs text-zinc-500">
                  Figma 변수 모드 추가 후 활성화 예정
                </span>
              }
            />
          </section>

          {/* Card — MCP card_1line_with icon / card_1line_hor */}
          <section className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <h2 className="text-xs font-semibold text-zinc-600">Card</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <label className="flex items-center gap-1.5">
                <span>1line label</span>
                <input
                  type="text"
                  value={cardLabel}
                  onChange={(e) => setCardLabel(e.target.value)}
                  className="w-40 rounded border border-zinc-300 bg-white px-2 py-1"
                />
              </label>
              <label className="flex items-center gap-1.5">
                <span>emotion</span>
                <select
                  value={cardEmotionName}
                  onChange={(e) => setCardEmotionName(e.target.value as EmotionIconName | "")}
                  className="rounded border border-zinc-300 bg-white px-2 py-1"
                >
                  <option value="">없음</option>
                  <option value="happiness">happiness</option>
                  <option value="sad">sad</option>
                  <option value="angry">angry</option>
                  <option value="Calmness">Calmness</option>
                </select>
              </label>
              <label className="flex items-center gap-1.5">
                <Checkbox
                  checked={cardShowChevron}
                  onChange={(e) => setCardShowChevron(e.target.checked)}
                />
                <span>show Chevron</span>
              </label>
              <label className="flex items-center gap-1.5">
                <span>hor label</span>
                <input
                  type="text"
                  value={cardHorLabel}
                  onChange={(e) => setCardHorLabel(e.target.value)}
                  className="w-40 rounded border border-zinc-300 bg-white px-2 py-1"
                />
              </label>
              <label className="flex items-center gap-1.5">
                <span>D-</span>
                <input
                  type="text"
                  value={cardHorDate}
                  onChange={(e) => setCardHorDate(e.target.value)}
                  className="w-12 rounded border border-zinc-300 bg-white px-2 py-1 text-right"
                />
              </label>
            </div>
            <div className="space-y-2 rounded-lg bg-white p-3">
              <CardOneLineWithIcon
                label={cardLabel}
                emotion={cardEmotionName ? <EmotionIcon name={cardEmotionName} /> : null}
                showButton={cardShowChevron}
              />
              <CardOneLineHor label={cardHorLabel} date={cardHorDate} />
            </div>
          </section>

          {/* Functional Icons — size / color 테스트 */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500">
              Functional Icons (size · color)
            </h2>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">
                아이콘 사이즈 · 컬러
              </h3>
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span className="w-14 text-zinc-600">size</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={functionalIconSize}
                    onChange={(e) =>
                      setFunctionalIconSize(Number(e.target.value))
                    }
                  >
                    <option value={12}>12px</option>
                    <option value={16}>16px</option>
                    <option value={20}>20px</option>
                    <option value={24}>24px</option>
                    <option value={32}>32px</option>
                    <option value={40}>40px</option>
                    <option value={120}>120px</option>
                  </select>
                </label>
                <label className="flex items-center gap-1.5">
                  <span className="w-14 text-zinc-600">color</span>
                  <input
                    type="text"
                    className="playground-form-text w-24 rounded border border-zinc-300 px-2 py-1 font-mono"
                    value={functionalIconColor}
                    onChange={(e) =>
                      setFunctionalIconColor(e.target.value)}
                    placeholder="#35363a"
                  />
                </label>
                <span className="text-[10px] text-zinc-500">
                  hex 예: #046253, #35363a
                </span>
              </div>
              <div className="rounded-lg bg-white p-3">
                <FunctionalIconGrid
                  size={functionalIconSize}
                  color={functionalIconColor}
                />
              </div>
            </div>
          </section>

          {/* Weather Icons — size 테스트 */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500">
              Weather Icons (size)
            </h2>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">
                날씨 아이콘 사이즈
              </h3>
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span className="w-14 text-zinc-600">size</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={weatherIconSize}
                    onChange={(e) => setWeatherIconSize(Number(e.target.value))}
                  >
                    <option value={12}>12px</option>
                    <option value={16}>16px</option>
                    <option value={20}>20px</option>
                    <option value={24}>24px</option>
                    <option value={32}>32px</option>
                    <option value={40}>40px</option>
                    <option value={120}>120px</option>
                  </select>
                </label>
              </div>
              <div className="rounded-lg bg-white p-3">
                <WeatherIconGrid size={weatherIconSize} />
              </div>
            </div>
          </section>

          {/* Emotion Icons — size 테스트 */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500">
              Emotion Icons (size)
            </h2>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">
                감정 아이콘 사이즈
              </h3>
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span className="w-14 text-zinc-600">size</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={emotionIconSize}
                    onChange={(e) => setEmotionIconSize(Number(e.target.value))}
                  >
                    <option value={12}>12px</option>
                    <option value={16}>16px</option>
                    <option value={20}>20px</option>
                    <option value={24}>24px</option>
                    <option value={32}>32px</option>
                    <option value={40}>40px</option>
                    <option value={120}>120px</option>
                  </select>
                </label>
              </div>
              <div className="rounded-lg bg-white p-3">
                <EmotionIconGrid size={emotionIconSize} />
              </div>
            </div>
          </section>

          {/* Buttons (샘플) */}
          <section className="space-y-2">
            <h2 className="text-xs font-semibold text-zinc-500">Buttons</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                size="M"
                variant="contained"
                level="primary"
                leadingIcon={<ButtonLeadingIcon />}
              >
                Primary
              </Button>
              <Button size="M" variant="contained" level="secondary">
                Secondary
              </Button>
              <Button size="M" variant="outlined" level="primary">
                Outlined
              </Button>
              <Button size="M" variant="container" level="primary">
                Container
              </Button>
            </div>
            <ButtonSet
              size="M"
              primary={{ variant: "contained", level: "primary", children: "확인" }}
              secondary={{ variant: "outlined", level: "secondary", children: "취소" }}
            />
          </section>

          {/* Button props playground */}
          <section className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
            <h2 className="text-xs font-semibold text-zinc-600">
              Button properties
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <label className="flex items-center gap-1 text-xs text-zinc-700">
                  <span className="w-14">variant</span>
                  <select
                    className="playground-form-text h-7 rounded border border-zinc-300 bg-white px-2 text-xs"
                    value={buttonVariant}
                    onChange={(e) =>
                      setButtonVariant(e.target.value as ButtonProps["variant"])
                    }
                  >
                    <option value="contained">contained</option>
                    <option value="outlined">outlined</option>
                    <option value="container">button container</option>
                  </select>
                </label>
                <label className="flex items-center gap-1 text-xs text-zinc-700">
                  <span className="w-12">level</span>
                  <select
                    className="playground-form-text h-7 rounded border border-zinc-300 bg-white px-2 text-xs"
                    value={buttonLevel}
                    onChange={(e) =>
                      setButtonLevel(e.target.value as ButtonProps["level"])
                    }
                  >
                    <option value="primary">primary</option>
                    <option value="secondary">secondary</option>
                    <option value="tertiary">tertiary</option>
                  </select>
                </label>
                <label className="flex items-center gap-1 text-xs text-zinc-700">
                  <span className="w-10">size</span>
                  <select
                    className="playground-form-text h-7 rounded border border-zinc-300 bg-white px-2 text-xs"
                    value={buttonSize}
                    onChange={(e) =>
                      setButtonSize(e.target.value as ButtonProps["size"])
                    }
                  >
                    <option value="XL">XL</option>
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="S">S</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-zinc-700">
                <Checkbox
                  checked={buttonLeadingIcon}
                  onChange={(e) => setButtonLeadingIcon(e.target.checked)}
                  label={<span>leading icon</span>}
                />
                <Checkbox
                  checked={buttonTrailingIcon}
                  onChange={(e) => setButtonTrailingIcon(e.target.checked)}
                  label={<span>trailing icon</span>}
                />
                <Checkbox
                  checked={buttonFullWidth}
                  onChange={(e) => setButtonFullWidth(e.target.checked)}
                  label={<span>full width</span>}
                />
                <Checkbox
                  checked={buttonLoading}
                  onChange={(e) => setButtonLoading(e.target.checked)}
                  label={<span>loading</span>}
                />
                <Checkbox
                  checked={buttonDisabled}
                  onChange={(e) => setButtonDisabled(e.target.checked)}
                  label={<span>disabled</span>}
                />
              </div>

              <div className="rounded-lg bg-white p-3">
                <Button
                  variant={buttonVariant}
                  level={buttonLevel}
                  size={buttonSize}
                  fullWidth={buttonFullWidth}
                  loading={buttonLoading}
                  disabled={buttonDisabled}
                  leadingIcon={
                    buttonLeadingIcon ? <ButtonLeadingIcon /> : undefined
                  }
                  trailingIcon={
                    buttonTrailingIcon ? <ButtonTrailingIcon /> : undefined
                  }
                >
                  Button
                </Button>
              </div>

              <pre className="mt-1 overflow-x-auto rounded bg-zinc-900 p-2 text-[10px] leading-snug text-zinc-100">
{`<Button
  variant="${buttonVariant}"
  level="${buttonLevel}"
  size="${buttonSize}"
  leadingIcon=${buttonLeadingIcon ? "{<Icon />}" : "{undefined}"}
  trailingIcon=${buttonTrailingIcon ? "{<Icon />}" : "{undefined}"}
  fullWidth={${buttonFullWidth}}
  loading={${buttonLoading}}
  disabled={${buttonDisabled}}
>
  Button
</Button>`}
              </pre>
            </div>
          </section>

          {/* Toggles */}
          <section className="space-y-4">
            <h2 className="text-xs font-semibold text-zinc-500">Toggles</h2>
            <div className="space-y-2">
              <Checkbox
                label="오늘의 기록 완료"
                checked={doneToday}
                onChange={(e) => setDoneToday(e.target.checked)}
              />
              <div className="flex gap-4">
                <Radio
                  name="group"
                  value="option1"
                  label="옵션 1"
                  checked={radioValue === "option1"}
                  onChange={() => setRadioValue("option1")}
                />
                <Radio
                  name="group"
                  value="option2"
                  label="옵션 2"
                  checked={radioValue === "option2"}
                  onChange={() => setRadioValue("option2")}
                />
              </div>
              <ToggleSwitch
                checked={notifyOn}
                onChange={setNotifyOn}
                label="알림 받기"
              />
            </div>

            {/* Toggle Switch — 12 variants (Figma 1:1): S/M/L × Off, On, Disabled off, Disabled on */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-3 text-xs font-semibold text-zinc-600">
                Toggle Switch (12 variants)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 text-left text-zinc-500">
                      <th className="pb-2 pr-4 font-medium">Size</th>
                      <th className="w-[120px] pb-2 pr-2 font-medium">Off</th>
                      <th className="w-[120px] pb-2 pr-2 font-medium">On</th>
                      <th className="w-[120px] pb-2 pr-2 font-medium">Disabled off</th>
                      <th className="w-[120px] pb-2 font-medium">Disabled on</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-700">
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 pr-4 font-medium">S</td>
                      <td className="py-2 pr-2"><ToggleSwitch size="S" checked={toggleSOff} onChange={setToggleSOff} /></td>
                      <td className="py-2 pr-2"><ToggleSwitch size="S" checked={toggleSOn} onChange={setToggleSOn} /></td>
                      <td className="py-2 pr-2"><ToggleSwitch size="S" checked={false} disabled onChange={() => {}} /></td>
                      <td className="py-2"><ToggleSwitch size="S" checked={true} disabled onChange={() => {}} /></td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 pr-4 font-medium">M</td>
                      <td className="py-2 pr-2"><ToggleSwitch size="M" checked={toggleMOff} onChange={setToggleMOff} /></td>
                      <td className="py-2 pr-2"><ToggleSwitch size="M" checked={toggleMOn} onChange={setToggleMOn} /></td>
                      <td className="py-2 pr-2"><ToggleSwitch size="M" checked={false} disabled onChange={() => {}} /></td>
                      <td className="py-2"><ToggleSwitch size="M" checked={true} disabled onChange={() => {}} /></td>
                    </tr>
                    <tr className="border-b border-zinc-100">
                      <td className="py-2 pr-4 font-medium">L</td>
                      <td className="py-2 pr-2"><ToggleSwitch size="L" checked={toggleLOff} onChange={setToggleLOff} /></td>
                      <td className="py-2 pr-2"><ToggleSwitch size="L" checked={toggleLOn} onChange={setToggleLOn} /></td>
                      <td className="py-2 pr-2"><ToggleSwitch size="L" checked={false} disabled onChange={() => {}} /></td>
                      <td className="py-2"><ToggleSwitch size="L" checked={true} disabled onChange={() => {}} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Button Set & FAB — 속성 테스트 (MCP 스펙 기준) */}
          <section className="space-y-4">
            <h2 className="text-xs font-semibold text-zinc-500">
              Button Set & FAB
            </h2>
            <p className="text-[11px] text-zinc-500">
              MCP 검토: Button Set은 내부 슬롯에 <strong>Button</strong> 컴포넌트를 사용합니다. Figma의 button set 프레임은 buttons 블록(1 또는 2개)으로 구성되며, 각 블록 스타일을 디자인시스템 Button에 매핑했습니다.
            </p>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">
                Button Set 속성
              </h3>
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span className="text-zinc-600">size</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={buttonSetSize}
                    onChange={(e) =>
                      setButtonSetSize(e.target.value as ButtonSetSize)
                    }
                  >
                    <option value="L">L (56px)</option>
                    <option value="M">M (40px)</option>
                  </select>
                </label>
                <Checkbox
                  checked={buttonSetHasTwo}
                  onChange={(e) => setButtonSetHasTwo(e.target.checked)}
                  label={<span className="text-zinc-600">2버튼 (secondary 있음)</span>}
                />
                <Checkbox
                  checked={buttonSetFullWidth}
                  onChange={(e) => setButtonSetFullWidth(e.target.checked)}
                  label={<span className="text-zinc-600">fullWidth</span>}
                />
              </div>
              {buttonSetHasTwo && (
                <div className="mb-2 flex flex-wrap gap-3 text-xs">
                  <label className="flex items-center gap-1">
                    <span className="w-14 text-zinc-600">secondary</span>
                    <input
                      type="text"
                      className="playground-form-text w-20 rounded border border-zinc-300 px-2 py-1"
                      value={buttonSetSecondaryLabel}
                      onChange={(e) =>
                        setButtonSetSecondaryLabel(e.target.value)
                      }
                    />
                    <select
                      className="playground-form-text rounded border border-zinc-300 px-2 py-1"
                      value={buttonSetSecondaryVariant}
                      onChange={(e) =>
                        setButtonSetSecondaryVariant(
                          e.target.value as ButtonProps["variant"]
                        )
                      }
                    >
                      <option value="contained">contained</option>
                      <option value="outlined">outlined</option>
                      <option value="container">container</option>
                    </select>
                    <select
                      className="playground-form-text rounded border border-zinc-300 px-2 py-1"
                      value={buttonSetSecondaryLevel}
                      onChange={(e) =>
                        setButtonSetSecondaryLevel(
                          e.target.value as ButtonProps["level"]
                        )
                      }
                    >
                      <option value="primary">primary</option>
                      <option value="secondary">secondary</option>
                      <option value="tertiary">tertiary</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-1">
                    <span className="w-14 text-zinc-600">primary</span>
                    <input
                      type="text"
                      className="playground-form-text w-20 rounded border border-zinc-300 px-2 py-1"
                      value={buttonSetPrimaryLabel}
                      onChange={(e) =>
                        setButtonSetPrimaryLabel(e.target.value)
                      }
                    />
                    <select
                      className="playground-form-text rounded border border-zinc-300 px-2 py-1"
                      value={buttonSetPrimaryVariant}
                      onChange={(e) =>
                        setButtonSetPrimaryVariant(
                          e.target.value as ButtonProps["variant"]
                        )
                      }
                    >
                      <option value="contained">contained</option>
                      <option value="outlined">outlined</option>
                      <option value="container">container</option>
                    </select>
                    <select
                      className="playground-form-text rounded border border-zinc-300 px-2 py-1"
                      value={buttonSetPrimaryLevel}
                      onChange={(e) =>
                        setButtonSetPrimaryLevel(
                          e.target.value as ButtonProps["level"]
                        )
                      }
                    >
                      <option value="primary">primary</option>
                      <option value="secondary">secondary</option>
                      <option value="tertiary">tertiary</option>
                    </select>
                  </label>
                </div>
              )}
              {!buttonSetHasTwo && (
                <div className="mb-2 flex flex-wrap gap-3 text-xs">
                  <label className="flex items-center gap-1">
                    <span className="w-14 text-zinc-600">primary</span>
                    <input
                      type="text"
                      className="playground-form-text w-24 rounded border border-zinc-300 px-2 py-1"
                      value={buttonSetPrimaryLabel}
                      onChange={(e) =>
                        setButtonSetPrimaryLabel(e.target.value)
                      }
                    />
                    <select
                      className="playground-form-text rounded border border-zinc-300 px-2 py-1"
                      value={buttonSetPrimaryVariant}
                      onChange={(e) =>
                        setButtonSetPrimaryVariant(
                          e.target.value as ButtonProps["variant"]
                        )
                      }
                    >
                      <option value="contained">contained</option>
                      <option value="outlined">outlined</option>
                      <option value="container">container</option>
                    </select>
                    <select
                      className="playground-form-text rounded border border-zinc-300 px-2 py-1"
                      value={buttonSetPrimaryLevel}
                      onChange={(e) =>
                        setButtonSetPrimaryLevel(
                          e.target.value as ButtonProps["level"]
                        )
                      }
                    >
                      <option value="primary">primary</option>
                      <option value="secondary">secondary</option>
                      <option value="tertiary">tertiary</option>
                    </select>
                  </label>
                </div>
              )}
              <div className="rounded-lg bg-white p-3">
                <ButtonSet
                  size={buttonSetSize}
                  fullWidth={buttonSetFullWidth}
                  primary={{
                    variant: buttonSetPrimaryVariant,
                    level: buttonSetPrimaryLevel,
                    children: buttonSetPrimaryLabel,
                  }}
                  secondary={
                    buttonSetHasTwo
                      ? {
                          variant: buttonSetSecondaryVariant,
                          level: buttonSetSecondaryLevel,
                          children: buttonSetSecondaryLabel,
                        }
                      : undefined
                  }
                />
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">
                FAB 속성
              </h3>
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span className="text-zinc-600">variant</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={fabVariant}
                    onChange={(e) =>
                      setFabVariant(e.target.value as FabVariant)
                    }
                  >
                    <option value="primary">contained primary</option>
                    <option value="highlight">highlight</option>
                  </select>
                </label>
                <label className="flex items-center gap-1.5">
                  <span className="text-zinc-600">size</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={fabSize}
                    onChange={(e) =>
                      setFabSize(e.target.value as FabSize)
                    }
                  >
                    <option value="L">L (56px)</option>
                    <option value="M">M (32px)</option>
                  </select>
                </label>
                <Checkbox
                  checked={fabFixed}
                  onChange={(e) => setFabFixed(e.target.checked)}
                  label={<span className="text-zinc-600">fixed</span>}
                />
              </div>
              <div className="relative rounded-lg bg-white p-4">
                <Fab
                  variant={fabVariant}
                  size={fabSize}
                  fixed={fabFixed}
                  aria-label="FAB 추가"
                />
              </div>
            </div>
          </section>

          {/* List — variant / size / label / boolean 테스트 */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500">
              List (Item 단위 조합)
            </h2>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">
                List 속성 (variant, size, label, boolean 토글)
              </h3>
              <div className="mb-3 flex flex-wrap gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span className="w-16 text-zinc-600">variant</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={listVariant}
                    onChange={(e) => setListVariant(e.target.value as ListItemVariant)}
                  >
                    <option value="labelOnly">label only</option>
                    <option value="leadingIconLabel">leading icon + label</option>
                    <option value="labelTrailingIcon">label + trailing icon</option>
                    <option value="labelCheck">label + check</option>
                    <option value="labelLabel">label + label</option>
                    <option value="labelSwitch">label + switch</option>
                    <option value="labelRadio">label + radio</option>
                  </select>
                </label>
                <label className="flex items-center gap-1.5">
                  <span className="w-16 text-zinc-600">size</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={listSize}
                    onChange={(e) => setListSize(e.target.value as ListItemSize)}
                  >
                    <option value="S">S (32px)</option>
                    <option value="M">M (40px)</option>
                    <option value="L">L (56px)</option>
                  </select>
                </label>
                <label className="flex flex-col gap-0.5">
                  <span className="text-zinc-600">label</span>
                  <input
                    type="text"
                    className="playground-form-text w-40 rounded border border-zinc-300 px-2 py-1"
                    value={listLabel}
                    onChange={(e) => setListLabel(e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-0.5">
                  <span className="text-zinc-600">secondaryLabel</span>
                  <input
                    type="text"
                    className="playground-form-text w-28 rounded border border-zinc-300 px-2 py-1"
                    value={listSecondaryLabel}
                    onChange={(e) => setListSecondaryLabel(e.target.value)}
                    placeholder="label + label용"
                  />
                </label>
                <Checkbox
                  checked={listChecked}
                  onChange={(e) => setListChecked(e.target.checked)}
                  label={<span className="text-zinc-600">checked</span>}
                />
                <Checkbox
                  checked={listSelected}
                  onChange={(e) => setListSelected(e.target.checked)}
                  label={<span className="text-zinc-600">selected</span>}
                />
                <Checkbox
                  checked={!!listActiveId}
                  onChange={(e) => setListActiveId(e.target.checked ? "1" : undefined)}
                  label={<span className="text-zinc-600">activeId 사용</span>}
                />
              </div>
              <div className="rounded-lg bg-white p-3">
                <List
                  items={[
                    {
                      id: "1",
                      variant: listVariant,
                      size: listSize,
                      label: listLabel,
                      secondaryLabel: listSecondaryLabel,
                    checked: listVariant === "labelSwitch" ? listSwitchChecked : listChecked,
                      selected: listSelected,
                      onCheckChange: listVariant === "labelCheck" ? setListChecked : undefined,
                    onSwitchChange: listVariant === "labelSwitch" ? setListSwitchChecked : undefined,
                      onRadioSelect: listVariant === "labelRadio" ? () => setListSelected(true) : undefined,
                      radioName: "playground-list-radio",
                    },
                    {
                      id: "2",
                      variant: "labelOnly",
                      size: listSize,
                      label: "두 번째 항목",
                    },
                    {
                      id: "3",
                      variant: "labelTrailingIcon",
                      size: listSize,
                      label: "세 번째 (trailing)",
                    },
                    {
                      id: "4",
                      variant: "labelRadio",
                      size: listSize,
                      label: "라디오 B",
                      selected: !listSelected,
                      onRadioSelect: () => setListSelected(false),
                      radioName: "playground-list-radio",
                    },
                  ]}
                  activeId={listActiveId}
                  onChange={setListActiveId}
                />
              </div>
            </div>
          </section>

          {/* Toast Message — variant / label / action 테스트 */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500">
              Toast Message
            </h2>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">
                Toast 속성 (variant, label, action)
              </h3>
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span className="w-12 text-zinc-600">variant</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={toastVariant}
                    onChange={(e) =>
                      setToastVariant(e.target.value as ToastMessageVariant)
                    }
                  >
                    <option value="labelOnly">label only</option>
                    <option value="labelAction">label + action</option>
                  </select>
                </label>
                <label className="flex items-center gap-1.5">
                  <span className="w-12 text-zinc-600">label</span>
                  <input
                    type="text"
                    className="playground-form-text w-36 rounded border border-zinc-300 px-2 py-1"
                    value={toastLabel}
                    onChange={(e) => setToastLabel(e.target.value)}
                    placeholder="라벨"
                  />
                </label>
                {toastVariant === "labelAction" && (
                  <label className="flex items-center gap-1.5">
                    <span className="w-12 text-zinc-600">action</span>
                    <input
                      type="text"
                      className="playground-form-text w-24 rounded border border-zinc-300 px-2 py-1"
                      value={toastAction}
                      onChange={(e) => setToastAction(e.target.value)}
                      placeholder="액션"
                    />
                  </label>
                )}
              </div>
              <div className="rounded-lg bg-white p-3">
                <ToastMessage
                  label={toastLabel}
                  action={toastAction}
                  variant={toastVariant}
                  onAction={() => window.alert("액션 클릭")}
                />
              </div>
            </div>
          </section>

          {/* Calendar — 상태별 테스트 */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500">
              Calendar (Day: 기본 · 오늘 · 선택 · 일정 있음)
            </h2>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">
                Day 속성 (Figma: state, show_recorded)
              </h3>
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span className="text-zinc-600">state</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={dayState}
                    onChange={(e) =>
                      setDayState(e.target.value as CalendarDayState)
                    }
                  >
                    <option value="disabled">disabled</option>
                    <option value="enable">enable</option>
                    <option value="today">✓ today</option>
                    <option value="holiday">holiday</option>
                  </select>
                </label>
                <Checkbox
                  checked={dayShowRecorded}
                  onChange={(e) => setDayShowRecorded(e.target.checked)}
                  label={<span className="text-zinc-600">show_recorded</span>}
                />
              </div>
              <div className="mb-3 flex items-center gap-2">
                <CalendarDay
                  date={new Date()}
                  label="00"
                  state={dayState}
                  showRecorded={dayShowRecorded}
                />
                <span className="text-[10px] text-zinc-500">
                  state={dayState}, show_recorded={String(dayShowRecorded)}
                </span>
              </div>
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">
                Day 4가지 state + show_recorded
              </h3>
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col items-center gap-1">
                  <CalendarDay date={new Date()} label={15} state="enable" />
                  <span className="text-[10px] text-zinc-500">enable</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CalendarDay date={new Date()} label={15} state="today" />
                  <span className="text-[10px] text-zinc-500">today</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CalendarDay date={new Date()} label={15} state="today" showRecorded />
                  <span className="text-[10px] text-zinc-500">today + 기록</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CalendarDay date={new Date()} label={15} isSelected />
                  <span className="text-[10px] text-zinc-500">선택</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CalendarDay date={new Date()} label={15} state="holiday" showRecorded />
                  <span className="text-[10px] text-zinc-500">holiday + 기록</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CalendarDay date={new Date()} label={15} state="disabled" />
                  <span className="text-[10px] text-zinc-500">disabled</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3">
              <h3 className="mb-2 text-xs font-semibold text-zinc-600">속성</h3>
              <div className="flex flex-wrap gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span className="text-zinc-600">선택 모드</span>
                  <select
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={calendarSelectionMode}
                    onChange={(e) =>
                      setCalendarSelectionMode(e.target.value as SelectionMode)
                    }
                  >
                    <option value="single">single</option>
                    <option value="range">range</option>
                  </select>
                </label>
                <label className="flex items-center gap-1.5">
                  <span className="text-zinc-600">오늘 표시 (테스트)</span>
                  <input
                    type="date"
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    value={calendarTodayOverride}
                    onChange={(e) => setCalendarTodayOverride(e.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded border border-zinc-300 bg-white px-2 py-1 text-zinc-600"
                    onClick={() => setCalendarTodayOverride("")}
                  >
                    실제 오늘
                  </button>
                </label>
                <label className="flex flex-col gap-0.5">
                  <span className="text-zinc-600">일정 있는 날 (도트, YYYY-MM-DD 쉼표)</span>
                  <input
                    type="text"
                    className="playground-form-text rounded border border-zinc-300 bg-white px-2 py-1"
                    placeholder="2025-03-05, 2025-03-12"
                    value={calendarDotDates.join(", ")}
                    onChange={(e) =>
                      setCalendarDotDates(
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                  />
                </label>
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                {calendarSelectionMode === "single" && (
                  <>선택: {calendarDate ? calendarDate.toLocaleDateString("ko-KR") : "없음"}</>
                )}
                {calendarSelectionMode === "range" && (
                  <>
                    범위: {calendarRangeStart?.toLocaleDateString("ko-KR") ?? "—"} ~{" "}
                    {calendarRangeEnd?.toLocaleDateString("ko-KR") ?? "—"}
                  </>
                )}
              </div>
            </div>
            <Card variant="flat">
              <Calendar
                selectionMode={calendarSelectionMode}
                value={calendarSelectionMode === "single" ? calendarDate : undefined}
                rangeStart={calendarSelectionMode === "range" ? calendarRangeStart : undefined}
                rangeEnd={calendarSelectionMode === "range" ? calendarRangeEnd : undefined}
                todayOverride={
                  calendarTodayOverride
                    ? new Date(calendarTodayOverride + "T12:00:00")
                    : null
                }
                onChangeDate={(d) => setCalendarDate(d)}
                onChangeRange={(start, end) => {
                  setCalendarRangeStart(start);
                  setCalendarRangeEnd(end);
                }}
                renderDayDot={(date) => {
                  const y = date.getFullYear();
                  const m = String(date.getMonth() + 1).padStart(2, "0");
                  const d = String(date.getDate()).padStart(2, "0");
                  const key = `${y}-${m}-${d}`; // 로컬 기준 YYYY-MM-DD
                  return calendarDotDates.includes(key);
                }}
                className="w-full"
              />
            </Card>
            <Card variant="elevated">
              <List
                items={[
                  {
                    id: "1",
                    variant: "labelSwitch",
                    size: "L",
                    label: "오늘의 회고",
                    checked: bottomTodayReviewOn,
                    onSwitchChange: setBottomTodayReviewOn,
                  },
                  {
                    id: "2",
                    variant: "labelSwitch",
                    size: "L",
                    label: "내일의 목표",
                    checked: bottomTomorrowGoalOn,
                    onSwitchChange: setBottomTomorrowGoalOn,
                  },
                ]}
              />
            </Card>
          </section>
        </div>

        <BottomNavBar
          active={bottomNav}
          onChange={setBottomNav}
        />

        <Fab
          fixed={false}
          variant="primary"
          size="L"
          className="absolute bottom-24 right-6"
          aria-label="새 기록"
        />
      </main>
    </div>
  );
}

