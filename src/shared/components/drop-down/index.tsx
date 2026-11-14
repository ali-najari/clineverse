"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./styles.module.scss";
import { ChevronDown } from "lucide-react";

export interface DropdownOption<T = string> {
  label: string;
  value: T;
}

interface DropdownProps<T = string> {
  options: DropdownOption<T>[];
  value?: T;
  defaultValue?: T;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: T) => void;
}

export function Dropdown<T = string>({
  options,
  value,
  defaultValue,
  placeholder = "Choose an option",
  disabled = false,
  onChange,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue,
  );
  const rootRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((o) => o.value === currentValue);

  const handleSelect = useCallback(
    (opt: DropdownOption<T>) => {
      if (value === undefined) setInternalValue(opt.value);
      onChange?.(opt.value);
      setOpen(false);
    },
    [onChange, value],
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.dropdown} ${disabled ? styles.disabled : ""}`}
    >
      <div className={styles.trigger}>
        <button
          type="button"
          className={styles.triggerText}
          onClick={() => !disabled && setOpen((o) => !o)}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </button>

        <button
          type="button"
          aria-label="Toggle dropdown"
          className={`${styles.toggleBtn} ${open ? styles.toggleBtnOpen : ""}`}
          onClick={() => !disabled && setOpen((o) => !o)}
        >
          <ChevronDown size={16} strokeWidth={2.5} className={styles.icon} />
        </button>
      </div>

      {open && (
        <ul className={styles.menu}>
          {options.map((opt) => (
            <li key={String(opt.value)}>
              <button
                type="button"
                className={`${styles.option} ${
                  opt.value === currentValue ? styles.optionActive : ""
                }`}
                onClick={() => handleSelect(opt)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
