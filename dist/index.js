// src/components/button/Button.jsx
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var Button = forwardRef(function button({ className, text, name, onClick }, ref) {
  return /* @__PURE__ */ jsx(
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

// src/components/checkbox/Checkbox.jsx
import { forwardRef as forwardRef2 } from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Checkbox = forwardRef2(function checkbox({ label, className, name, defaultValue }, ref) {
  {
    const classNames = `checkbox ${className}`;
    return /* @__PURE__ */ jsxs("label", { className: classNames, children: [
      /* @__PURE__ */ jsx2(
        "input",
        {
          type: "checkbox",
          name,
          ref,
          defaultChecked: defaultValue
        }
      ),
      /* @__PURE__ */ jsx2("div", { className: "checkbox-element", children: /* @__PURE__ */ jsx2("div", { className: "tick" }) }),
      /* @__PURE__ */ jsx2("span", { children: label })
    ] });
  }
});
var Checkbox_default = Checkbox;

// src/components/code/Code.jsx
import copy from "clipboard-copy";
import Highlight from "react-highlight";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var TitleBarButton = (id) => /* @__PURE__ */ jsx3("div", { className: "title-bar-button", id }, id);
var TitleBarButtons = () => {
  const titleBarButtons = ["close", "minimize", "maximize"];
  return /* @__PURE__ */ jsx3("div", { id: "title-bar-buttons", children: titleBarButtons.map(TitleBarButton) });
};
var TitleBar = ({ title, code }) => /* @__PURE__ */ jsxs2("div", { id: "title-bar", children: [
  /* @__PURE__ */ jsx3(TitleBarButtons, {}),
  /* @__PURE__ */ jsx3("div", { id: "title-bar-title", children: title }),
  /* @__PURE__ */ jsx3("div", { id: "title-bar-actions", children: /* @__PURE__ */ jsx3(
    "button",
    {
      type: "button",
      className: "title-bar-action",
      onClick: () => copy(code),
      children: "Copy"
    }
  ) })
] });
var LineCount = ({ code }) => {
  const numberOfLines = code.split("\n").length;
  const lineNumbers = Array.from({ length: numberOfLines }, (_, i) => i + 1);
  return /* @__PURE__ */ jsx3("div", { id: "line-count", children: lineNumbers.map((lineNum) => /* @__PURE__ */ jsx3("div", { className: "line-count-item", children: lineNum }, lineNum)) });
};
var CodeEditor = ({ code, language }) => {
  return /* @__PURE__ */ jsxs2("div", { id: "code-editor", children: [
    /* @__PURE__ */ jsx3(LineCount, { code }),
    /* @__PURE__ */ jsx3(Highlight, { language, children: code })
  ] });
};
var Code = ({ title, code, language = "javascript" }) => /* @__PURE__ */ jsxs2("div", { id: "code", children: [
  /* @__PURE__ */ jsx3(TitleBar, { title, code }),
  /* @__PURE__ */ jsx3(CodeEditor, { code, language })
] });
var Code_default = Code;

// src/components/dropdown/Dropdown.jsx
import { forwardRef as forwardRef3 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var Dropdown = forwardRef3(function dropdown({ options, multiple, id, className, name, defaultValue }, ref) {
  const classNames = `dropdown ${className}`;
  return /* @__PURE__ */ jsx4("div", { className: classNames, children: /* @__PURE__ */ jsx4(
    "select",
    {
      name,
      multiple,
      id,
      ref,
      defaultValue,
      children: options.map(({ value, text }) => /* @__PURE__ */ jsx4("option", { value, children: text }, value))
    }
  ) });
});
var Dropdown_default = Dropdown;

// src/components/footer/Footer.jsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var Footer = ({ leftSection, rightSection }) => /* @__PURE__ */ jsx5("div", { id: "footer", children: /* @__PURE__ */ jsx5("div", { className: "container", children: /* @__PURE__ */ jsxs3("div", { className: "withSidePadding", children: [
  leftSection,
  rightSection
] }) }) });
var Footer_default = Footer;

// src/components/form-field/FormField.jsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var ErrorMessage = ({ error }) => /* @__PURE__ */ jsx6("div", { className: "error-message", children: error });
var FormField = ({ children, error }) => {
  const errorClass = error ? "error" : null;
  const errorMessage = error ? /* @__PURE__ */ jsx6(ErrorMessage, { error }) : null;
  const classNames = `form-field ${errorClass}`;
  return /* @__PURE__ */ jsxs4("div", { className: classNames, children: [
    children,
    errorMessage
  ] });
};
var FormField_default = FormField;

// src/components/hero/Hero.jsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var CTA = (Link) => {
  const f = ({ href, text, buttonClass }, i) => {
    if (!Link)
      return /* @__PURE__ */ jsx7(
        "a",
        {
          href,
          className: `button theme-default ${buttonClass}`,
          children: text
        },
        i
      );
    return /* @__PURE__ */ jsx7(
      Link,
      {
        href,
        className: `button theme-default ${buttonClass}`,
        children: text
      },
      i
    );
  };
  return f;
};
var Hero = ({ title, description, ctas, Link }) => {
  const ctaFunk = CTA(Link);
  if (typeof description === "string") {
    description = /* @__PURE__ */ jsx7("p", { children: description });
  }
  return /* @__PURE__ */ jsxs5("div", { id: "hero", children: [
    /* @__PURE__ */ jsxs5("div", { id: "heading-and-lead", children: [
      /* @__PURE__ */ jsx7("h1", { children: title }),
      description
    ] }),
    /* @__PURE__ */ jsx7("div", { id: "hero-ctas", children: ctas.map(ctaFunk) })
  ] });
};
var Hero_default = Hero;

// src/components/input/Input.jsx
import { forwardRef as forwardRef4 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var Input = forwardRef4(function input({ type = "text", className, defaultValue, placeholder, name, onChange }, ref) {
  return /* @__PURE__ */ jsx8(
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

// src/components/nav-bar/NavBar.jsx
import { Component } from "react";

// src/components/menu-item/MenuItem.jsx
import { jsx as jsx9 } from "react/jsx-runtime";
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
      return /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(
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
      return /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9("li", { children: /* @__PURE__ */ jsx9("button", { type: "button", id, className, onClick, children: text }) }, i);
  }
};
var MenuItem_default = MenuItem;

// src/components/desktop-menu/DesktopMenu.jsx
import { jsx as jsx10 } from "react/jsx-runtime";
import { createElement } from "react";
var DesktopMenu = ({ links, loggedIn, Link }) => /* @__PURE__ */ jsx10("ul", { id: "desktop-menu", children: links.filter((x) => !x.hideOnDesktop).filter((x) => x.hideOptions({ loggedIn })).map((link, i) => {
  return /* @__PURE__ */ createElement(MenuItem_default, { ...link, i, key: link.id, Link });
}) });
var DesktopMenu_default = DesktopMenu;

// src/components/hamburger/Hamburger.jsx
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
var Hamburger = ({ width, height, onClick }) => /* @__PURE__ */ jsx11(
  "button",
  {
    type: "button",
    id: "hamburger",
    onClick,
    "data-testid": "hamburger",
    children: /* @__PURE__ */ jsxs6(
      "svg",
      {
        width: width || "33px",
        height: height || "26px",
        viewBox: "0 0 33 26",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        children: [
          /* @__PURE__ */ jsx11("title", { children: "Menu" }),
          /* @__PURE__ */ jsx11(
            "g",
            {
              id: "hamburger-container",
              stroke: "none",
              strokeWidth: "1",
              fill: "none",
              fillRule: "evenodd",
              strokeLinecap: "end",
              strokeLinejoin: "end",
              children: /* @__PURE__ */ jsx11(
                "g",
                {
                  id: "hamburger-layers",
                  transform: "translate(-328.000000, -19.000000)",
                  stroke: "#000",
                  strokeWidth: "2",
                  children: /* @__PURE__ */ jsxs6("g", { id: "Group", transform: "translate(330.000000, 20.000000)", children: [
                    /* @__PURE__ */ jsx11("path", { d: "M0.357142857,1 L29.320836,1", id: "layer-1" }),
                    /* @__PURE__ */ jsx11("path", { d: "M0.357142857,12 L29.320836,12", id: "layer-2" }),
                    /* @__PURE__ */ jsx11("path", { d: "M0.357142857,23 L29.320836,23", id: "layer-3" })
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

// src/components/close-icon/CloseIcon.jsx
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
var CloseIcon = ({ width, height }) => /* @__PURE__ */ jsxs7(
  "svg",
  {
    width: width || "26px",
    height: height || "26px",
    viewBox: "0 0 26 26",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    children: [
      /* @__PURE__ */ jsx12("title", { children: "Close" }),
      /* @__PURE__ */ jsx12(
        "g",
        {
          id: "containing-group",
          stroke: "none",
          strokeWidth: "1",
          fill: "none",
          fillRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsx12(
            "g",
            {
              id: "9.7\u201D-iPad",
              transform: "translate(-681.000000, -23.000000)",
              stroke: "#000",
              strokeWidth: "3",
              children: /* @__PURE__ */ jsxs7("g", { id: "Group-2", transform: "translate(683.000000, 25.000000)", children: [
                /* @__PURE__ */ jsx12("path", { d: "M0.315354693,22.0054813 L22.320836,0", id: "Line-3" }),
                /* @__PURE__ */ jsx12("path", { d: "M0.320836027,0 L22.320836,22", id: "Line-3" })
              ] })
            }
          )
        }
      )
    ]
  }
);
var CloseIcon_default = CloseIcon;

// src/components/mobile-menu/MobileMenu.jsx
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
var MobileMenu = ({ menuOpen, toggleMenu, links, loggedIn, Link }) => {
  return /* @__PURE__ */ jsxs8("div", { id: "mobile-menu", className: menuOpen ? "open" : "closed", children: [
    /* @__PURE__ */ jsx13("div", { id: "mobile-menu-header", children: /* @__PURE__ */ jsx13("button", { type: "button", id: "close-icon", onClick: toggleMenu, children: /* @__PURE__ */ jsx13(CloseIcon_default, { width: "20px" }) }) }),
    menuOpen && /* @__PURE__ */ jsx13("ul", { children: links.filter((x) => x.hideOptions({ loggedIn })).map((link, i) => {
      return /* @__PURE__ */ jsx13(
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

// src/components/nav-bar/NavBar.jsx
import { Fragment, jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
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
      midSection = /* @__PURE__ */ jsx14("div", {})
    } = this.props;
    const { menuOpen } = this.state;
    return /* @__PURE__ */ jsxs9(Fragment, { children: [
      /* @__PURE__ */ jsx14("div", { id: "nav-bar", className, children: /* @__PURE__ */ jsx14("div", { className: "container", children: /* @__PURE__ */ jsxs9("div", { className: "withSidePadding", children: [
        logo,
        midSection,
        /* @__PURE__ */ jsx14(Hamburger_default, { width: "25px", onClick: this.toggleMenu }),
        /* @__PURE__ */ jsx14(DesktopMenu_default, { ...{ links, loggedIn, Link } })
      ] }) }) }),
      /* @__PURE__ */ jsx14(
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

// src/components/page/Page.jsx
import { jsx as jsx15 } from "react/jsx-runtime";
var Page = ({ children }) => /* @__PURE__ */ jsx15("div", { className: "page", children });
var Page_default = Page;

// src/components/radio-button/RadioButton.jsx
import { forwardRef as forwardRef5 } from "react";
import { jsx as jsx16, jsxs as jsxs10 } from "react/jsx-runtime";
var RadioButton = forwardRef5(function radioButton({ name, label, className, defaultValue }, ref) {
  const classNames = `radio ${className}`;
  return /* @__PURE__ */ jsxs10("label", { className: classNames, children: [
    /* @__PURE__ */ jsx16("input", { type: "radio", name, ref, defaultValue }),
    /* @__PURE__ */ jsx16("div", { className: "radio-element", children: /* @__PURE__ */ jsx16("div", { className: "selected" }) }),
    /* @__PURE__ */ jsx16("span", { children: label })
  ] });
});
var RadioButton_default = RadioButton;

// src/components/select/Select.jsx
import { forwardRef as forwardRef6 } from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var Option = ({ value, label }, index) => /* @__PURE__ */ jsx17("option", { value, children: label }, index);
var Select = forwardRef6(function select({ className, defaultValue, name, onChange, options }, ref) {
  return /* @__PURE__ */ jsx17(
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

// src/components/terminal/Terminal.jsx
import copy2 from "clipboard-copy";
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
var Terminal = ({ title, code }) => {
  return /* @__PURE__ */ jsxs11("div", { id: "terminal", children: [
    /* @__PURE__ */ jsxs11("div", { id: "title-bar", children: [
      /* @__PURE__ */ jsxs11("div", { id: "title-bar-buttons", children: [
        /* @__PURE__ */ jsx18("div", { className: "title-bar-button", id: "close" }),
        /* @__PURE__ */ jsx18("div", { className: "title-bar-button", id: "minimize" }),
        /* @__PURE__ */ jsx18("div", { className: "title-bar-button", id: "maximize" })
      ] }),
      /* @__PURE__ */ jsx18("div", { id: "title-bar-title", children: title }),
      /* @__PURE__ */ jsx18("div", { id: "title-bar-actions", children: /* @__PURE__ */ jsx18(
        "button",
        {
          type: "button",
          className: "title-bar-action",
          onClick: () => copy2(code),
          children: "Copy"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx18("pre", { children: /* @__PURE__ */ jsx18("code", { children: code }) })
  ] });
};
var Terminal_default = Terminal;

// src/components/textarea/Textarea.jsx
import { forwardRef as forwardRef7 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var Textarea = forwardRef7(function textarea({ className, defaultValue, placeholder, name, onChange }, ref) {
  return /* @__PURE__ */ jsx19(
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
});
var Textarea_default = Textarea;

// index.jsx
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
var applyWebpackConfig = (test = /\.jsx/) => {
  return (config, options) => {
    config.module.rules.push({
      test,
      use: [options.defaultLoaders.babel]
    });
    return config;
  };
};
export {
  Button_default as Button,
  Checkbox_default as Checkbox,
  Code_default as Code,
  Dropdown_default as Dropdown,
  Footer_default as Footer,
  FormField_default as FormField,
  Hero_default as Hero,
  Input_default as Input,
  NavBar_default as NavBar,
  Page_default as Page,
  RadioButton_default as RadioButton,
  Select_default as Select,
  Terminal_default as Terminal,
  Textarea_default as Textarea,
  applyWebpackConfig,
  handleErrors
};
