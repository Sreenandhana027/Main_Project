import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check } from "lucide-react";

/**
 * ModernDropdown — a fully custom, animated dropdown select component.
 *
 * Props:
 *  - options:       Array of { value, label } objects
 *  - value:         Currently selected value (controlled)
 *  - onChange:      (value) => void
 *  - placeholder:   Placeholder text when nothing is selected
 *  - label:         Optional label rendered above the trigger (sr-only by default)
 *  - id:            Optional id for accessibility
 *  - required:      Adds visual indicator
 *  - variant:       "default" | "dark" | "minimal" — style preset
 *  - className:     Extra classes on the outer wrapper
 *  - disabled:      Disables the dropdown
 */
export default function ModernDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  label,
  id,
  required = false,
  variant = "default",
  className = "",
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const triggerRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value);

  // Filtered options for keyboard search
  const filteredOptions =
    search.length > 0
      ? options.filter((o) =>
          o.label.toLowerCase().includes(search.toLowerCase())
        )
      : options;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const item = listRef.current.children[focusedIndex];
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, isOpen]);

  // Reset search & focus when closing
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
      setSearch("");
    }
  }, [isOpen]);

  const select = useCallback(
    (val) => {
      onChange?.(val);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          select(filteredOptions[focusedIndex].value);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Escape":
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      default:
        // Type-ahead search
        if (e.key.length === 1) {
          setSearch((prev) => prev + e.key);
          setFocusedIndex(0);
        }
    }
  };

  /* ── Variant styles ──────────────────────────────────── */
  const variants = {
    default: {
      trigger:
        "bg-white border border-slate-200 text-slate-800 hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm",
      menu: "bg-white border border-slate-200 shadow-2xl shadow-slate-200/60",
      item: "text-slate-700 hover:bg-indigo-50 hover:text-indigo-700",
      focused: "bg-indigo-50 text-indigo-700",
      selected: "text-indigo-600 font-medium",
      placeholder: "text-slate-400",
      check: "text-indigo-500",
    },
    dark: {
      trigger:
        "bg-black border border-zinc-700 text-white hover:border-zinc-500 focus:border-white focus:ring-2 focus:ring-white/10 shadow-sm",
      menu: "bg-zinc-900 border border-zinc-700 shadow-2xl shadow-black/60",
      item: "text-zinc-300 hover:bg-zinc-800 hover:text-white",
      focused: "bg-zinc-800 text-white",
      selected: "text-white font-medium",
      placeholder: "text-zinc-500",
      check: "text-white",
    },
    minimal: {
      trigger:
        "bg-transparent border-b border-slate-300 text-slate-800 hover:border-slate-500 focus:border-indigo-500 rounded-none shadow-none",
      menu: "bg-white border border-slate-200 shadow-2xl shadow-slate-200/60",
      item: "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
      focused: "bg-slate-50 text-slate-900",
      selected: "text-indigo-600 font-medium",
      placeholder: "text-slate-400",
      check: "text-indigo-500",
    },
  };

  const v = variants[variant] || variants.default;

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden native select for form submission / validation */}
      <select
        tabIndex={-1}
        aria-hidden="true"
        required={required}
        value={value || ""}
        onChange={() => {}}
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label || placeholder}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((o) => !o)}
        className={`
          w-full flex items-center justify-between gap-2
          px-4 py-3 rounded-xl text-sm
          outline-none cursor-pointer
          transition-all duration-200 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed
          ${v.trigger}
        `}
      >
        <span
          className={`truncate ${
            selectedOption ? "" : v.placeholder
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute z-50 mt-2 w-full rounded-xl overflow-hidden
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          origin-top
          ${
            isOpen
              ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-y-[0.96] -translate-y-1 pointer-events-none"
          }
          ${v.menu}
        `}
        role="listbox"
        aria-label={label || placeholder}
      >
        <ul
          ref={listRef}
          className="max-h-60 overflow-y-auto py-1 scrollbar-thin"
        >
          {filteredOptions.length === 0 && (
            <li className="px-4 py-3 text-sm text-slate-400 text-center">
              No options found
            </li>
          )}
          {filteredOptions.map((option, index) => {
            const isSelected = option.value === value;
            const isFocused = index === focusedIndex;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => select(option.value)}
                className={`
                  flex items-center justify-between gap-2
                  px-4 py-2.5 text-sm cursor-pointer
                  transition-colors duration-150
                  ${isFocused ? v.focused : v.item}
                  ${isSelected ? v.selected : ""}
                `}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check
                    size={14}
                    className={`shrink-0 ${v.check}`}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
