import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';

/**
 * @interface ICalendarProps
 * 캘린더 컴포넌트의 속성을 정의합니다.
 */
export interface ICalendarProps {
  /** 기본 선택된 날짜 */
  defaultSelectedDate?: Date | null;
  /** 선택된 날짜 */
  selectedDate?: Date | null;
  /** 로케일 설정 */
  locale?: string;
  /** 헤더 형식 */
  headerFormat?: string;
  /** 클래스 이름 */
  className?: string;
  /** 항목이 있는 날짜 */
  hasItemDates?: Date[];
  /** 비활성화할 날짜를 결정하는 함수 */
  disableDates?: (date: Date) => boolean;
  /** 날짜 변경 시 호출되는 함수 */
  onChange?: (date: Date | null) => void;
  /** 이전 연도 숨기기 */
  hidePrevYear?: boolean;
  /** 다음 연도 숨기기 */
  hideNextYear?: boolean;
  /** 월 변경 시 호출되는 함수 */
  onMonthChange?: (date: Date) => void;
}

/**
 * @interface IRangeCalendarProps
 * 범위 캘린더 컴포넌트의 속성을 정의합니다.
 */
export interface IRangeCalendarProps {
  /** 기본 선택된 날짜 범위 */
  defaultSelectedDate?: [Date | null, Date | null];
  /** 선택된 날짜 범위 */
  selectedDate?: [Date | null, Date | null];
  /** 로케일 설정 */
  locale?: string;
  /** 헤더 형식 */
  headerFormat?: string;
  /** 클래스 이름 */
  className?: string;
  /** 항목이 있는 날짜 */
  hasItemDates?: Date[];
  /** 비활성화할 날짜를 결정하는 함수 */
  disableDates?: (date: Date) => boolean;
  /** 날짜 범위 변경 시 호출되는 함수 */
  onChange?: (date: [Date | null, Date | null]) => void;
  /** 이전 연도 숨기기 */
  hidePrevYear?: boolean;
  /** 다음 연도 숨기기 */
  hideNextYear?: boolean;
  /** 캘린더 수 */
  calendarCount?: number;
  /** 최대 길이 */
  maxLength?: number;
  /** 최대 길이 단위 */
  maxLengthUnit?: 'd' | 'M' | 'y';
  /** 빠른 버튼 설정 */
  quickButtons?: { label: string; start: Date; end: Date }[];
}

/**
 * @interface ICalendarHeaderProps
 * 캘린더 헤더의 속성을 정의합니다.
 */
export interface ICalendarHeaderProps {
  /** 헤더 형식 */
  headerFormat: string;
  /** 이전 연도 숨기기 */
  hidePrevYear?: boolean;
  /** 다음 연도 숨기기 */
  hideNextYear?: boolean;
  /** 이전 월 숨기기 */
  hidePrevMonth?: boolean;
  /** 다음 월 숨기기 */
  hideNextMonth?: boolean;
  /** 인덱스 */
  index?: number;
}

/**
 * @interface ICalendarProviderProps
 * 캘린더 제공자의 속성을 정의합니다.
 */
export interface ICalendarProviderProps {
  /** 캘린더 수 */
  calendarCount?: number;
  /** 범위 여부 */
  isRange?: boolean;
  /** 기본 선택된 날짜 범위 */
  defaultSelectedDate?: [Date | null, Date | null];
  selectedDate?: [Date | null, Date | null];
  locale: string;
  onChange?: (date: [Date | null, Date | null]) => void;
  disableDates?: (date: Date) => boolean;
  quickButtons?: { label: string; start: Date; end: Date }[];
  hasItemDates?: Date[];
  maxLength?: number;
  maxLengthUnit?: 'd' | 'M' | 'y';
  children: ReactNode;
  onMonthChange?: (date: Date) => void;
}

export interface ICalendarDayProps {
  index?: number;
  date: Dayjs;
}
