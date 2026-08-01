// src/components/accordion/Accordion.tsx
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Accordion = ({
  items,
  allowMultiple = false,
  defaultOpen,
  onChange,
  className
}) => {
  const initialOpen = defaultOpen ? new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]) : /* @__PURE__ */ new Set();
  const [openItems, setOpenItems] = useState(initialOpen);
  const toggle = (id) => {
    const next = new Set(openItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      if (!allowMultiple) next.clear();
      next.add(id);
    }
    setOpenItems(next);
    onChange?.([...next]);
  };
  const wrapperClass = `accordion${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsx("div", { className: wrapperClass, children: items.map(({ id, title, content }) => {
    const isOpen = openItems.has(id);
    return /* @__PURE__ */ jsxs("div", { className: "accordion-item", children: [
      /* @__PURE__ */ jsx("h3", { className: "accordion-heading", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          id: `trigger-${id}`,
          "aria-expanded": isOpen,
          "aria-controls": `panel-${id}`,
          className: `accordion-trigger${isOpen ? " accordion-trigger-open" : ""}`,
          onClick: () => toggle(id),
          children: [
            /* @__PURE__ */ jsx("span", { className: "accordion-title", children: title }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `accordion-chevron${isOpen ? " accordion-chevron-open" : ""}`,
                "aria-hidden": "true"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          id: `panel-${id}`,
          "aria-labelledby": `trigger-${id}`,
          className: `accordion-panel${isOpen ? " accordion-panel-open" : ""}`,
          children: /* @__PURE__ */ jsx("div", { className: "accordion-panel-inner", children: content })
        }
      )
    ] }, id);
  }) });
};
var Accordion_default = Accordion;

// src/components/alert/Alert.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var variantIcons = {
  success: "\u2713",
  error: "\u2715",
  warning: "\u26A0",
  info: "\u2139"
};
var Alert = ({
  variant = "info",
  title,
  children,
  onClose,
  className
}) => {
  const role = variant === "error" || variant === "warning" ? "alert" : "status";
  const classNames = `alert alert-${variant}${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsxs2("div", { className: classNames, role, children: [
    /* @__PURE__ */ jsx2("div", { className: "alert-icon", children: variantIcons[variant] }),
    /* @__PURE__ */ jsxs2("div", { className: "alert-content", children: [
      title && /* @__PURE__ */ jsx2("div", { className: "alert-title", children: title }),
      /* @__PURE__ */ jsx2("div", { className: "alert-body", children })
    ] }),
    onClose && /* @__PURE__ */ jsx2(
      "button",
      {
        type: "button",
        className: "alert-close",
        onClick: onClose,
        "aria-label": "Dismiss",
        children: "\xD7"
      }
    )
  ] });
};
var Alert_default = Alert;

// src/components/avatar/Avatar.tsx
import { useState as useState2 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var COLOURS = [
  "#fd5548",
  "#fd9448",
  "#ffc61a",
  "#69b65c",
  "#279ae1",
  "#7bccff",
  "#95e388"
];
var getInitials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0].toUpperCase()).join("");
var getColour = (name) => {
  let hash = 0;
  for (const char of name) {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  }
  return COLOURS[Math.abs(hash) % COLOURS.length];
};
var PersonIcon = () => /* @__PURE__ */ jsx3(
  "svg",
  {
    className: "avatar-icon",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx3("path", { d: "M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.338 0-10 1.676-10 5v1h20v-1c0-3.324-6.662-5-10-5z" })
  }
);
var Avatar = ({
  src,
  alt,
  name,
  size = "md",
  shape = "circle",
  className
}) => {
  const [imgError, setImgError] = useState2(false);
  const classNames = `avatar avatar-${size} avatar-${shape}${className ? ` ${className}` : ""}`;
  if (src && !imgError) {
    return /* @__PURE__ */ jsx3("div", { className: classNames, children: /* @__PURE__ */ jsx3(
      "img",
      {
        src,
        alt: alt ?? name ?? "Avatar",
        className: "avatar-img",
        onError: () => setImgError(true)
      }
    ) });
  }
  if (name) {
    const initials = getInitials(name);
    const bgColour = getColour(name);
    return /* @__PURE__ */ jsx3(
      "div",
      {
        role: "img",
        className: classNames,
        style: { backgroundColor: bgColour },
        "aria-label": name,
        title: name,
        children: /* @__PURE__ */ jsx3("span", { className: "avatar-initials", "aria-hidden": "true", children: initials })
      }
    );
  }
  return /* @__PURE__ */ jsx3(
    "div",
    {
      role: "img",
      className: classNames,
      "aria-label": alt ?? "User avatar",
      title: alt ?? "User avatar",
      children: /* @__PURE__ */ jsx3(PersonIcon, {})
    }
  );
};
var Avatar_default = Avatar;

// src/components/badge/Badge.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var Badge = ({
  children,
  variant = "default",
  size = "md",
  className
}) => {
  const classNames = `badge badge-${variant} badge-${size}${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsx4("span", { className: classNames, children });
};
var Badge_default = Badge;

// src/components/breadcrumb/Breadcrumb.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var Breadcrumb = ({ items, separator = "/", className }) => {
  const classNames = `breadcrumb${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsx5("nav", { "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsx5("ol", { className: classNames, children: items.map((item, index) => /* @__PURE__ */ jsxs3("li", { className: "breadcrumb-item", children: [
    index > 0 && /* @__PURE__ */ jsx5("span", { className: "breadcrumb-separator", "aria-hidden": "true", children: separator }),
    item.href ? /* @__PURE__ */ jsx5("a", { href: item.href, className: "breadcrumb-link", children: item.label }) : /* @__PURE__ */ jsx5("span", { className: "breadcrumb-current", "aria-current": "page", children: item.label })
  ] }, item.href ?? item.label)) }) });
};
var Breadcrumb_default = Breadcrumb;

// src/components/button/Button.tsx
import { forwardRef } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Button = forwardRef(function button({ className, text, name, onClick }, ref) {
  return /* @__PURE__ */ jsx6(
    "button",
    {
      type: "button",
      name,
      ref,
      className,
      onClick,
      children: text
    }
  );
});
var Button_default = Button;

// src/components/card/Card.tsx
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var Card = ({
  image,
  imageAlt = "",
  title,
  subtitle,
  children,
  footer,
  className
}) => {
  const classNames = `card${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsxs4("div", { className: classNames, children: [
    image && /* @__PURE__ */ jsx7("img", { className: "card-image", src: image, alt: imageAlt }),
    (title || subtitle) && /* @__PURE__ */ jsxs4("div", { className: "card-header", children: [
      title && /* @__PURE__ */ jsx7("h3", { className: "card-title", children: title }),
      subtitle && /* @__PURE__ */ jsx7("p", { className: "card-subtitle", children: subtitle })
    ] }),
    /* @__PURE__ */ jsx7("div", { className: "card-body", children }),
    footer && /* @__PURE__ */ jsx7("div", { className: "card-footer", children: footer })
  ] });
};
var Card_default = Card;

// src/components/checkbox/Checkbox.tsx
import { forwardRef as forwardRef2 } from "react";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var Checkbox = forwardRef2(function checkbox({ label, className, name, defaultValue }, ref) {
  const classNames = `checkbox ${className}`;
  return /* @__PURE__ */ jsxs5("label", { className: classNames, children: [
    /* @__PURE__ */ jsx8(
      "input",
      {
        type: "checkbox",
        name,
        ref,
        defaultChecked: defaultValue
      }
    ),
    /* @__PURE__ */ jsx8("div", { className: "checkbox-element", children: /* @__PURE__ */ jsx8("div", { className: "tick" }) }),
    /* @__PURE__ */ jsx8("span", { children: label })
  ] });
});
var Checkbox_default = Checkbox;

// src/components/code/Code.tsx
import copy from "clipboard-copy";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var TitleBarButton = (id) => /* @__PURE__ */ jsx9("div", { className: "title-bar-button", id }, id);
var TitleBarButtons = () => {
  const titleBarButtons = ["close", "minimize", "maximize"];
  return /* @__PURE__ */ jsx9("div", { id: "title-bar-buttons", children: titleBarButtons.map(TitleBarButton) });
};
var TitleBar = ({ title, code }) => /* @__PURE__ */ jsxs6("div", { id: "title-bar", children: [
  /* @__PURE__ */ jsx9(TitleBarButtons, {}),
  /* @__PURE__ */ jsx9("div", { id: "title-bar-title", children: title }),
  /* @__PURE__ */ jsx9("div", { id: "title-bar-actions", children: /* @__PURE__ */ jsx9(
    "button",
    {
      type: "button",
      className: "title-bar-action",
      onClick: () => copy(code),
      children: "Copy"
    }
  ) })
] });
var LineNumbers = ({ code }) => {
  const count = code.split("\n").length;
  const numbers = [];
  for (let i = 1; i <= count; i++) numbers.push(i);
  return /* @__PURE__ */ jsx9("div", { className: "code-line-numbers", "aria-hidden": "true", children: numbers.map((n) => /* @__PURE__ */ jsx9("span", { className: "code-line-number", children: n }, n)) });
};
var Code = ({ title, code, language = "javascript" }) => /* @__PURE__ */ jsxs6("div", { className: "code", children: [
  /* @__PURE__ */ jsx9(TitleBar, { title, code }),
  /* @__PURE__ */ jsxs6("div", { className: "code-editor", children: [
    /* @__PURE__ */ jsx9(LineNumbers, { code }),
    /* @__PURE__ */ jsx9(
      SyntaxHighlighter,
      {
        language,
        style: oneDark,
        customStyle: {
          background: "transparent",
          margin: 0,
          padding: "10px 12px",
          fontSize: "10pt",
          borderRadius: 0,
          overflowX: "auto",
          flex: 1,
          minWidth: 0
        },
        children: code
      }
    )
  ] })
] });
var Code_default = Code;

// src/components/combo-box/ComboBox.tsx
import { useEffect, useId, useRef, useState as useState3 } from "react";
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var ComboBox = ({
  options = [],
  value,
  onChange,
  onSelect,
  placeholder = "Search...",
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState3(value ?? "");
  const [isOpen, setIsOpen] = useState3(false);
  const [activeIndex, setActiveIndex] = useState3(-1);
  const containerRef = useRef(null);
  const listboxId = useId();
  const filtered = options.filter(
    (opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setIsOpen(true);
    setActiveIndex(-1);
    onChange?.(val);
  };
  const handleSelect = (option) => {
    setInputValue(option.label);
    setIsOpen(false);
    setActiveIndex(-1);
    onSelect?.(option);
  };
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
        setActiveIndex(0);
        e.preventDefault();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setActiveIndex((i) => Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(filtered[activeIndex]);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };
  return /* @__PURE__ */ jsxs7("div", { className: "combo-box", ref: containerRef, children: [
    /* @__PURE__ */ jsx10(
      "input",
      {
        type: "text",
        className: "combo-box-input",
        value: inputValue,
        onChange: handleInputChange,
        onFocus: () => setIsOpen(true),
        onKeyDown: handleKeyDown,
        placeholder,
        disabled,
        role: "combobox",
        "aria-expanded": isOpen,
        "aria-autocomplete": "list",
        "aria-controls": listboxId,
        "aria-activedescendant": activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : void 0
      }
    ),
    isOpen && /* @__PURE__ */ jsx10("div", { className: "combo-box-listbox", role: "listbox", id: listboxId, children: filtered.length > 0 ? filtered.map((option, index) => /* @__PURE__ */ jsx10(
      "div",
      {
        id: `${listboxId}-option-${index}`,
        className: `combo-box-option${activeIndex === index ? " combo-box-option-active" : ""}`,
        role: "option",
        tabIndex: -1,
        "aria-selected": activeIndex === index,
        onMouseDown: () => handleSelect(option),
        children: option.label
      },
      option.value
    )) : /* @__PURE__ */ jsx10("div", { className: "combo-box-no-results", children: "No results found" }) })
  ] });
};
var ComboBox_default = ComboBox;

// src/components/divider/Divider.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var Divider = ({
  orientation = "horizontal",
  variant = "solid",
  label,
  className = ""
}) => {
  const classNames = `divider divider-${orientation} divider-${variant}${className ? ` ${className}` : ""}`;
  if (orientation === "horizontal" && !label) {
    return /* @__PURE__ */ jsx11("hr", { className: classNames });
  }
  return /* @__PURE__ */ jsx11("div", { "aria-hidden": "true", className: classNames, children: label && /* @__PURE__ */ jsx11("span", { className: "divider-label", children: label }) });
};
var Divider_default = Divider;

// src/components/dropdown/Dropdown.tsx
import { forwardRef as forwardRef3 } from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var Dropdown = forwardRef3(function dropdown({ options, multiple, id, className, name, defaultValue }, ref) {
  const classNames = `dropdown ${className}`;
  return /* @__PURE__ */ jsx12("div", { className: classNames, children: /* @__PURE__ */ jsx12(
    "select",
    {
      name,
      multiple,
      id,
      ref,
      defaultValue,
      children: options.map(({ value, text }) => /* @__PURE__ */ jsx12("option", { value, children: text }, value))
    }
  ) });
});
var Dropdown_default = Dropdown;

// src/components/footer/Footer.tsx
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
var Footer = ({ leftSection, rightSection }) => /* @__PURE__ */ jsx13("div", { id: "footer", children: /* @__PURE__ */ jsx13("div", { className: "container", children: /* @__PURE__ */ jsxs8("div", { className: "withSidePadding", children: [
  leftSection,
  rightSection
] }) }) });
var Footer_default = Footer;

// src/components/form-field/FormField.tsx
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var ErrorMessage = ({ error }) => /* @__PURE__ */ jsx14("div", { className: "error-message", children: error });
var FormField = ({ children, error }) => {
  const errorClass = error ? "error" : null;
  const errorMessage = error ? /* @__PURE__ */ jsx14(ErrorMessage, { error }) : null;
  const classNames = `form-field ${errorClass}`;
  return /* @__PURE__ */ jsxs9("div", { className: classNames, children: [
    children,
    errorMessage
  ] });
};
var FormField_default = FormField;

// src/components/hero/Hero.tsx
import { jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
var CTA = (Link) => ({ href, text, buttonClass }, i) => {
  if (!Link)
    return /* @__PURE__ */ jsx15(
      "a",
      {
        href,
        className: `button theme-default ${buttonClass}`,
        children: text
      },
      i
    );
  return /* @__PURE__ */ jsx15(
    Link,
    {
      href,
      className: `button theme-default ${buttonClass}`,
      children: text
    },
    i
  );
};
var Hero = ({ title, description, ctas, Link }) => {
  const ctaFunk = CTA(Link);
  const descriptionEl = typeof description === "string" ? /* @__PURE__ */ jsx15("p", { children: description }) : description;
  return /* @__PURE__ */ jsxs10("div", { id: "hero", children: [
    /* @__PURE__ */ jsxs10("div", { id: "heading-and-lead", children: [
      /* @__PURE__ */ jsx15("h1", { children: title }),
      descriptionEl
    ] }),
    /* @__PURE__ */ jsx15("div", { id: "hero-ctas", children: ctas.map(ctaFunk) })
  ] });
};
var Hero_default = Hero;

// src/components/input/Input.tsx
import { forwardRef as forwardRef4 } from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var Input = forwardRef4(function input({ type = "text", className, defaultValue, placeholder, name, onChange }, ref) {
  return /* @__PURE__ */ jsx16(
    "input",
    {
      ref,
      name,
      type,
      className,
      defaultValue,
      onChange,
      placeholder
    }
  );
});
var Input_default = Input;

// src/components/modal/Modal.tsx
import { useEffect as useEffect2, useRef as useRef2 } from "react";
import { jsx as jsx17, jsxs as jsxs11 } from "react/jsx-runtime";
var Modal = ({ isOpen, onClose, title, children, footer }) => {
  const dialogRef = useRef2(null);
  useEffect2(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);
  useEffect2(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = () => onClose?.();
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose?.();
  };
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <dialog> handles keyboard interaction natively via the cancel event (Escape key)
    /* @__PURE__ */ jsx17("dialog", { ref: dialogRef, className: "modal", onClick: handleBackdropClick, children: /* @__PURE__ */ jsxs11("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs11("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsx17("h2", { className: "modal-title", children: title }),
        /* @__PURE__ */ jsx17(
          "button",
          {
            type: "button",
            className: "modal-close",
            onClick: onClose,
            "aria-label": "Close",
            children: "\xD7"
          }
        )
      ] }),
      /* @__PURE__ */ jsx17("div", { className: "modal-body", children }),
      footer && /* @__PURE__ */ jsx17("div", { className: "modal-footer", children: footer })
    ] }) })
  );
};
var Modal_default = Modal;

// src/components/nav-bar/NavBar.tsx
import { Component } from "react";

// src/components/menu-item/MenuItem.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
var MenuItem = ({
  text,
  id,
  className,
  url,
  target,
  rel,
  onClick,
  isMobile,
  toggleMenu,
  Link,
  i
}) => {
  if (url && !onClick) {
    if (url.startsWith("http") || url.startsWith("mailto")) {
      return /* @__PURE__ */ jsx18("li", { children: /* @__PURE__ */ jsx18(
        "a",
        {
          id,
          href: url,
          className,
          target,
          rel,
          onClick: isMobile ? toggleMenu : void 0,
          children: text
        }
      ) }, i);
    } else {
      return /* @__PURE__ */ jsx18("li", { children: /* @__PURE__ */ jsx18(
        Link,
        {
          id,
          href: url,
          className,
          target,
          rel,
          onClick: isMobile ? toggleMenu : void 0,
          children: text
        }
      ) }, i);
    }
  } else {
    return /* @__PURE__ */ jsx18("li", { children: /* @__PURE__ */ jsx18("button", { type: "button", id, className, onClick, children: text }) }, i);
  }
};
var MenuItem_default = MenuItem;

// src/components/desktop-menu/DesktopMenu.tsx
import { jsx as jsx19 } from "react/jsx-runtime";
import { createElement } from "react";
var DesktopMenu = ({ links, loggedIn, Link }) => /* @__PURE__ */ jsx19("ul", { id: "desktop-menu", children: links.filter((x) => !x.hideOnDesktop).filter((x) => x.hideOptions({ loggedIn })).map((link, i) => {
  return /* @__PURE__ */ createElement(
    MenuItem_default,
    {
      ...link,
      i,
      key: link.id,
      Link
    }
  );
}) });
var DesktopMenu_default = DesktopMenu;

// src/components/hamburger/Hamburger.tsx
import { jsx as jsx20, jsxs as jsxs12 } from "react/jsx-runtime";
var Hamburger = ({ width, height, onClick }) => /* @__PURE__ */ jsx20(
  "button",
  {
    type: "button",
    id: "hamburger",
    onClick,
    "data-testid": "hamburger",
    children: /* @__PURE__ */ jsxs12(
      "svg",
      {
        width: width || "33px",
        height: height || "26px",
        viewBox: "0 0 33 26",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        children: [
          /* @__PURE__ */ jsx20("title", { children: "Menu" }),
          /* @__PURE__ */ jsx20(
            "g",
            {
              id: "hamburger-container",
              stroke: "none",
              strokeWidth: "1",
              fill: "none",
              fillRule: "evenodd",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: /* @__PURE__ */ jsx20(
                "g",
                {
                  id: "hamburger-layers",
                  transform: "translate(-328.000000, -19.000000)",
                  stroke: "#000",
                  strokeWidth: "2",
                  children: /* @__PURE__ */ jsxs12("g", { id: "Group", transform: "translate(330.000000, 20.000000)", children: [
                    /* @__PURE__ */ jsx20("path", { d: "M0.357142857,1 L29.320836,1", id: "layer-1" }),
                    /* @__PURE__ */ jsx20("path", { d: "M0.357142857,12 L29.320836,12", id: "layer-2" }),
                    /* @__PURE__ */ jsx20("path", { d: "M0.357142857,23 L29.320836,23", id: "layer-3" })
                  ] })
                }
              )
            }
          )
        ]
      }
    )
  }
);
var Hamburger_default = Hamburger;

// src/components/close-icon/CloseIcon.tsx
import { jsx as jsx21, jsxs as jsxs13 } from "react/jsx-runtime";
var CloseIcon = ({ width, height }) => /* @__PURE__ */ jsxs13(
  "svg",
  {
    width: width || "26px",
    height: height || "26px",
    viewBox: "0 0 26 26",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    children: [
      /* @__PURE__ */ jsx21("title", { children: "Close" }),
      /* @__PURE__ */ jsx21(
        "g",
        {
          id: "containing-group",
          stroke: "none",
          strokeWidth: "1",
          fill: "none",
          fillRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsx21(
            "g",
            {
              id: '9.7"-iPad',
              transform: "translate(-681.000000, -23.000000)",
              stroke: "#000",
              strokeWidth: "3",
              children: /* @__PURE__ */ jsxs13("g", { id: "Group-2", transform: "translate(683.000000, 25.000000)", children: [
                /* @__PURE__ */ jsx21("path", { d: "M0.315354693,22.0054813 L22.320836,0", id: "Line-3" }),
                /* @__PURE__ */ jsx21("path", { d: "M0.320836027,0 L22.320836,22", id: "Line-3" })
              ] })
            }
          )
        }
      )
    ]
  }
);
var CloseIcon_default = CloseIcon;

// src/components/mobile-menu/MobileMenu.tsx
import { jsx as jsx22, jsxs as jsxs14 } from "react/jsx-runtime";
var MobileMenu = ({
  menuOpen,
  toggleMenu,
  links,
  loggedIn,
  Link
}) => {
  return /* @__PURE__ */ jsxs14("div", { id: "mobile-menu", className: menuOpen ? "open" : "closed", children: [
    /* @__PURE__ */ jsx22("div", { id: "mobile-menu-header", children: /* @__PURE__ */ jsx22("button", { type: "button", id: "close-icon", onClick: toggleMenu, children: /* @__PURE__ */ jsx22(CloseIcon_default, { width: "20px" }) }) }),
    menuOpen && /* @__PURE__ */ jsx22("ul", { children: links.filter((x) => x.hideOptions({ loggedIn })).map((link, i) => {
      return /* @__PURE__ */ jsx22(
        MenuItem_default,
        {
          ...link,
          isMobile: true,
          toggleMenu,
          i,
          Link
        },
        link.id
      );
    }) })
  ] });
};
var MobileMenu_default = MobileMenu;

// src/components/nav-bar/NavBar.tsx
import { Fragment, jsx as jsx23, jsxs as jsxs15 } from "react/jsx-runtime";
var NavBar = class extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }
  render() {
    const {
      logo,
      links,
      Link,
      loggedIn,
      className,
      midSection = /* @__PURE__ */ jsx23("div", {})
    } = this.props;
    const { menuOpen } = this.state;
    return /* @__PURE__ */ jsxs15(Fragment, { children: [
      /* @__PURE__ */ jsx23("div", { id: "nav-bar", className, children: /* @__PURE__ */ jsx23("div", { className: "container", children: /* @__PURE__ */ jsxs15("div", { className: "withSidePadding", children: [
        logo,
        midSection,
        /* @__PURE__ */ jsx23(Hamburger_default, { width: "25px", onClick: this.toggleMenu }),
        /* @__PURE__ */ jsx23(DesktopMenu_default, { ...{ links, loggedIn, Link } })
      ] }) }) }),
      /* @__PURE__ */ jsx23(
        MobileMenu_default,
        {
          ...{
            menuOpen,
            toggleMenu: this.toggleMenu,
            links,
            loggedIn,
            Link
          }
        }
      )
    ] });
  }
};
var NavBar_default = NavBar;

// src/components/page/Page.tsx
import { jsx as jsx24 } from "react/jsx-runtime";
var Page = ({ children }) => /* @__PURE__ */ jsx24("div", { className: "page", children });
var Page_default = Page;

// src/components/pagination/Pagination.tsx
import { jsx as jsx25, jsxs as jsxs16 } from "react/jsx-runtime";
var getPageNumbers = (currentPage, totalPages, siblingCount) => {
  const totalShown = 2 * siblingCount + 5;
  if (totalPages <= totalShown) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const left = Math.max(2, currentPage - siblingCount);
  const right = Math.min(totalPages - 1, currentPage + siblingCount);
  const pages = [1];
  if (left > 2) pages.push("left-ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages - 1) pages.push("right-ellipsis");
  pages.push(totalPages);
  return pages;
};
var Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className
}) => {
  if (totalPages < 2) return null;
  const pages = getPageNumbers(currentPage, totalPages, siblingCount);
  const classNames = `pagination${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsxs16("nav", { className: classNames, "aria-label": "Pagination", children: [
    showFirstLast && /* @__PURE__ */ jsx25(
      "button",
      {
        type: "button",
        className: "pagination-nav",
        "aria-label": "First page",
        onClick: () => onPageChange(1),
        disabled: currentPage === 1,
        children: "\xAB"
      }
    ),
    /* @__PURE__ */ jsx25(
      "button",
      {
        type: "button",
        className: "pagination-nav",
        "aria-label": "Previous page",
        onClick: () => onPageChange(currentPage - 1),
        disabled: currentPage === 1,
        children: "\u2039"
      }
    ),
    pages.map((page) => {
      if (page === "left-ellipsis" || page === "right-ellipsis") {
        return /* @__PURE__ */ jsx25("span", { className: "pagination-ellipsis", children: "\u2026" }, page);
      }
      const pageNum = page;
      const isActive = pageNum === currentPage;
      return /* @__PURE__ */ jsx25(
        "button",
        {
          type: "button",
          className: `pagination-page${isActive ? " pagination-page-active" : ""}`,
          "aria-current": isActive ? "page" : void 0,
          onClick: () => onPageChange(pageNum),
          children: pageNum
        },
        pageNum
      );
    }),
    /* @__PURE__ */ jsx25(
      "button",
      {
        type: "button",
        className: "pagination-nav",
        "aria-label": "Next page",
        onClick: () => onPageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        children: "\u203A"
      }
    ),
    showFirstLast && /* @__PURE__ */ jsx25(
      "button",
      {
        type: "button",
        className: "pagination-nav",
        "aria-label": "Last page",
        onClick: () => onPageChange(totalPages),
        disabled: currentPage === totalPages,
        children: "\xBB"
      }
    )
  ] });
};
var Pagination_default = Pagination;

// src/components/popover/Popover.tsx
import { cloneElement, useEffect as useEffect3, useRef as useRef3, useState as useState4 } from "react";
import { jsx as jsx26, jsxs as jsxs17 } from "react/jsx-runtime";
var Popover = ({
  trigger,
  content,
  title,
  position = "bottom",
  className
}) => {
  const [isOpen, setIsOpen] = useState4(false);
  const containerRef = useRef3(null);
  useEffect3(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);
  useEffect3(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  const triggerEl = cloneElement(trigger, {
    onClick: (e) => {
      trigger.props.onClick?.(e);
      setIsOpen((prev) => !prev);
    },
    "aria-expanded": isOpen,
    "aria-haspopup": "dialog"
  });
  const popoverClass = `popover popover-${position}${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsxs17("div", { ref: containerRef, className: "popover-wrapper", children: [
    triggerEl,
    isOpen && /* @__PURE__ */ jsxs17(
      "dialog",
      {
        open: true,
        className: popoverClass,
        "aria-label": title ?? "Popover",
        "aria-modal": "false",
        children: [
          /* @__PURE__ */ jsxs17("div", { className: "popover-header", children: [
            title && /* @__PURE__ */ jsx26("div", { className: "popover-title", children: title }),
            /* @__PURE__ */ jsx26(
              "button",
              {
                type: "button",
                className: "popover-close",
                onClick: () => setIsOpen(false),
                "aria-label": "Close",
                children: "\xD7"
              }
            )
          ] }),
          /* @__PURE__ */ jsx26("div", { className: "popover-body", children: content })
        ]
      }
    )
  ] });
};
var Popover_default = Popover;

// src/components/progress-bar/ProgressBar.tsx
import { jsx as jsx27, jsxs as jsxs18 } from "react/jsx-runtime";
var ProgressBar = ({
  value = 0,
  max = 100,
  variant = "default",
  size = "md",
  label,
  showValue = false,
  indeterminate = false,
  className = ""
}) => {
  const percentage = indeterminate ? null : Math.min(100, Math.max(0, value / max * 100));
  return /* @__PURE__ */ jsxs18("div", { className: `progress-bar-wrapper${className ? ` ${className}` : ""}`, children: [
    (label || showValue && !indeterminate) && /* @__PURE__ */ jsxs18("div", { className: "progress-bar-header", children: [
      label && /* @__PURE__ */ jsx27("span", { className: "progress-bar-label", children: label }),
      showValue && !indeterminate && /* @__PURE__ */ jsxs18("span", { className: "progress-bar-value", children: [
        Math.round(percentage),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx27(
      "div",
      {
        className: `progress-bar progress-bar-${size}`,
        role: "progressbar",
        "aria-valuenow": indeterminate ? void 0 : value,
        "aria-valuemin": 0,
        "aria-valuemax": max,
        "aria-label": label ?? "Progress",
        children: /* @__PURE__ */ jsx27(
          "div",
          {
            className: `progress-bar-fill progress-bar-${variant}${indeterminate ? " progress-bar-indeterminate" : ""}`,
            style: indeterminate ? void 0 : { width: `${percentage}%` }
          }
        )
      }
    )
  ] });
};
var ProgressBar_default = ProgressBar;

// src/components/radio-button/RadioButton.tsx
import { forwardRef as forwardRef5 } from "react";
import { jsx as jsx28, jsxs as jsxs19 } from "react/jsx-runtime";
var RadioButton = forwardRef5(
  function radioButton({ name, label, className, defaultValue, value, onChange, checked }, ref) {
    const classNames = `radio ${className}`;
    const isControlled = checked !== void 0;
    return /* @__PURE__ */ jsxs19("label", { className: classNames, children: [
      /* @__PURE__ */ jsx28(
        "input",
        {
          type: "radio",
          name,
          ref,
          value: isControlled ? value : defaultValue,
          ...isControlled ? { checked, onChange } : {}
        }
      ),
      /* @__PURE__ */ jsx28("div", { className: "radio-element", children: /* @__PURE__ */ jsx28("div", { className: "selected" }) }),
      /* @__PURE__ */ jsx28("span", { children: label })
    ] });
  }
);
var RadioButton_default = RadioButton;

// src/components/select/Select.tsx
import { forwardRef as forwardRef6 } from "react";
import { jsx as jsx29 } from "react/jsx-runtime";
var Option = ({ value, label }, index) => /* @__PURE__ */ jsx29("option", { value, children: label }, index);
var Select = forwardRef6(function select({ className, defaultValue, name, onChange, options }, ref) {
  return /* @__PURE__ */ jsx29(
    "select",
    {
      ref,
      name,
      className: `select ${className}`,
      defaultValue,
      onChange,
      children: options.map(Option)
    }
  );
});
var Select_default = Select;

// src/components/skeleton/Skeleton.tsx
import { jsx as jsx30 } from "react/jsx-runtime";
var toCSS = (value) => typeof value === "number" ? `${value}px` : value;
var SkeletonLine = ({ width, height, borderRadius }) => /* @__PURE__ */ jsx30(
  "div",
  {
    className: "skeleton",
    style: {
      width: toCSS(width ?? "100%"),
      height: toCSS(height ?? "1rem"),
      borderRadius
    },
    "aria-hidden": "true"
  }
);
var Skeleton = ({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
  lines = 1,
  className
}) => {
  if (lines === 1) {
    return /* @__PURE__ */ jsx30(
      "div",
      {
        className: `skeleton${className ? ` ${className}` : ""}`,
        style: { width: toCSS(width), height: toCSS(height), borderRadius },
        "aria-hidden": "true"
      }
    );
  }
  const lineItems = Array.from({ length: lines }, (_, i) => ({
    id: `line-${i}`,
    isLast: i === lines - 1
  }));
  return /* @__PURE__ */ jsx30("div", { className: `skeleton-group${className ? ` ${className}` : ""}`, children: lineItems.map(({ id, isLast }) => /* @__PURE__ */ jsx30(
    SkeletonLine,
    {
      width: isLast ? "70%" : width,
      height,
      borderRadius
    },
    id
  )) });
};
var Skeleton_default = Skeleton;

// src/components/spinner/Spinner.tsx
import { jsx as jsx31 } from "react/jsx-runtime";
var Spinner = ({
  size = "md",
  label = "Loading...",
  className
}) => {
  const classNames = `spinner spinner-${size}${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsx31("div", { className: classNames, role: "status", "aria-label": label });
};
var Spinner_default = Spinner;

// src/components/switch/Switch.tsx
import { forwardRef as forwardRef7, useState as useState5 } from "react";
import { jsx as jsx32, jsxs as jsxs20 } from "react/jsx-runtime";
var Switch = forwardRef7(function switchInput({
  name,
  label,
  className,
  checked,
  defaultChecked = false,
  onChange,
  disabled
}, ref) {
  const isControlled = checked !== void 0;
  const [internalChecked, setInternalChecked] = useState5(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;
  const handleChange = (e) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };
  const labelClass = `switch${disabled ? " switch-disabled" : ""}${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsxs20("label", { className: labelClass, children: [
    /* @__PURE__ */ jsx32(
      "input",
      {
        type: "checkbox",
        role: "switch",
        "aria-checked": isChecked,
        name,
        ref,
        checked: isChecked,
        onChange: handleChange,
        disabled
      }
    ),
    /* @__PURE__ */ jsx32("div", { className: "switch-track", children: /* @__PURE__ */ jsx32("div", { className: "switch-thumb" }) }),
    label && /* @__PURE__ */ jsx32("span", { className: "switch-label", children: label })
  ] });
});
var Switch_default = Switch;

// src/components/table/Table.tsx
import { jsx as jsx33, jsxs as jsxs21 } from "react/jsx-runtime";
var Table = ({
  columns,
  rows,
  rowKey = "id",
  caption,
  className
}) => {
  const classNames = `table${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsx33("div", { className: "table-wrapper", children: /* @__PURE__ */ jsxs21("table", { className: classNames, children: [
    caption && /* @__PURE__ */ jsx33("caption", { children: caption }),
    /* @__PURE__ */ jsx33("thead", { children: /* @__PURE__ */ jsx33("tr", { children: columns.map(({ key, header }) => /* @__PURE__ */ jsx33("th", { scope: "col", children: header }, key)) }) }),
    /* @__PURE__ */ jsx33("tbody", { children: rows.map((row) => /* @__PURE__ */ jsx33("tr", { children: columns.map(({ key, render }) => /* @__PURE__ */ jsx33("td", { children: render ? render(row[key], row) : row[key] }, key)) }, row[rowKey])) })
  ] }) });
};
var Table_default = Table;

// src/components/tabs/Tabs.tsx
import { useRef as useRef4, useState as useState6 } from "react";
import { jsx as jsx34, jsxs as jsxs22 } from "react/jsx-runtime";
var Tabs = ({ tabs, defaultTab, onChange, className }) => {
  const [activeTab, setActiveTab] = useState6(defaultTab ?? tabs[0]?.id);
  const tabRefs = useRef4({});
  const handleSelect = (id) => {
    setActiveTab(id);
    onChange?.(id);
  };
  const handleKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      const nextId = tabs[nextIndex].id;
      handleSelect(nextId);
      tabRefs.current[nextId]?.focus();
    }
  };
  const wrapperClass = `tabs${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsxs22("div", { className: wrapperClass, children: [
    /* @__PURE__ */ jsx34("div", { role: "tablist", className: "tabs-list", children: tabs.map(({ id, label }, index) => /* @__PURE__ */ jsx34(
      "button",
      {
        ref: (el) => {
          tabRefs.current[id] = el;
        },
        id: `tab-${id}`,
        type: "button",
        role: "tab",
        "aria-selected": activeTab === id,
        "aria-controls": `panel-${id}`,
        className: `tabs-tab${activeTab === id ? " tabs-tab-active" : ""}`,
        tabIndex: activeTab === id ? 0 : -1,
        onClick: () => handleSelect(id),
        onKeyDown: (e) => handleKeyDown(e, index),
        children: label
      },
      id
    )) }),
    tabs.map(({ id, content }) => /* @__PURE__ */ jsx34(
      "div",
      {
        id: `panel-${id}`,
        role: "tabpanel",
        "aria-labelledby": `tab-${id}`,
        className: "tabs-panel",
        hidden: activeTab !== id,
        children: content
      },
      id
    ))
  ] });
};
var Tabs_default = Tabs;

// src/components/terminal/Terminal.tsx
import copy2 from "clipboard-copy";
import { jsx as jsx35, jsxs as jsxs23 } from "react/jsx-runtime";
var Terminal = ({ title, code }) => {
  return /* @__PURE__ */ jsxs23("div", { className: "terminal", children: [
    /* @__PURE__ */ jsxs23("div", { id: "title-bar", children: [
      /* @__PURE__ */ jsxs23("div", { id: "title-bar-buttons", children: [
        /* @__PURE__ */ jsx35("div", { className: "title-bar-button", id: "close" }),
        /* @__PURE__ */ jsx35("div", { className: "title-bar-button", id: "minimize" }),
        /* @__PURE__ */ jsx35("div", { className: "title-bar-button", id: "maximize" })
      ] }),
      /* @__PURE__ */ jsx35("div", { id: "title-bar-title", children: title }),
      /* @__PURE__ */ jsx35("div", { id: "title-bar-actions", children: /* @__PURE__ */ jsx35(
        "button",
        {
          type: "button",
          className: "title-bar-action",
          onClick: () => copy2(code),
          children: "Copy"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx35("pre", { children: /* @__PURE__ */ jsx35("code", { children: code }) })
  ] });
};
var Terminal_default = Terminal;

// src/components/textarea/Textarea.tsx
import { forwardRef as forwardRef8 } from "react";
import { jsx as jsx36 } from "react/jsx-runtime";
var Textarea = forwardRef8(
  function textarea({ className, defaultValue, placeholder, name, onChange }, ref) {
    return /* @__PURE__ */ jsx36(
      "textarea",
      {
        ref,
        name,
        className,
        defaultValue,
        onChange,
        placeholder
      }
    );
  }
);
var Textarea_default = Textarea;

// src/components/toast/Toast.tsx
import { useEffect as useEffect4 } from "react";
import { jsx as jsx37, jsxs as jsxs24 } from "react/jsx-runtime";
var variantIcons2 = {
  success: "\u2713",
  error: "\u2715",
  warning: "\u26A0",
  info: "\u2139"
};
var Toast = ({
  isVisible,
  title,
  message,
  variant = "info",
  position = "top-right",
  onClose,
  duration = 4e3
}) => {
  useEffect4(() => {
    if (!isVisible || !duration) return;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxs24(
    "div",
    {
      className: `toast toast-${variant} toast-${position}`,
      role: "alert",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ jsx37("div", { className: "toast-icon", children: variantIcons2[variant] }),
        /* @__PURE__ */ jsxs24("div", { className: "toast-content", children: [
          title && /* @__PURE__ */ jsx37("div", { className: "toast-title", children: title }),
          /* @__PURE__ */ jsx37("div", { className: "toast-message", children: message })
        ] }),
        /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            className: "toast-close",
            onClick: onClose,
            "aria-label": "Close",
            children: "\xD7"
          }
        )
      ]
    }
  );
};
var Toast_default = Toast;

// src/components/tooltip/Tooltip.tsx
import { jsx as jsx38, jsxs as jsxs25 } from "react/jsx-runtime";
var Tooltip = ({
  children,
  content,
  position = "top",
  className
}) => {
  const tooltipClass = `tooltip tooltip-${position}${className ? ` ${className}` : ""}`;
  return /* @__PURE__ */ jsxs25("span", { className: "tooltip-wrapper", children: [
    children,
    /* @__PURE__ */ jsx38("span", { role: "tooltip", className: tooltipClass, children: content })
  ] });
};
var Tooltip_default = Tooltip;

// index.tsx
var handleErrors = (setError, err) => {
  const errors = [];
  if (err?.response?.data?.errors) {
    for (const key in err.response.data.errors) {
      for (const error of err.response.data.errors[key]) {
        errors.push({
          name: key,
          message: error.message
        });
      }
    }
  }
  setError(errors);
};
export {
  Accordion_default as Accordion,
  Alert_default as Alert,
  Avatar_default as Avatar,
  Badge_default as Badge,
  Breadcrumb_default as Breadcrumb,
  Button_default as Button,
  Card_default as Card,
  Checkbox_default as Checkbox,
  Code_default as Code,
  ComboBox_default as ComboBox,
  Divider_default as Divider,
  Dropdown_default as Dropdown,
  Footer_default as Footer,
  FormField_default as FormField,
  Hero_default as Hero,
  Input_default as Input,
  Modal_default as Modal,
  NavBar_default as NavBar,
  Page_default as Page,
  Pagination_default as Pagination,
  Popover_default as Popover,
  ProgressBar_default as ProgressBar,
  RadioButton_default as RadioButton,
  Select_default as Select,
  Skeleton_default as Skeleton,
  Spinner_default as Spinner,
  Switch_default as Switch,
  Table_default as Table,
  Tabs_default as Tabs,
  Terminal_default as Terminal,
  Textarea_default as Textarea,
  Toast_default as Toast,
  Tooltip_default as Tooltip,
  handleErrors
};
