import B, { useEffect as P, useMemo as p, useContext as ge, createContext as ve, useState as O, useCallback as _ } from "react";
import { NotePencilIcon as xe, CalendarIcon as be, Record as je, Phone as we, XIcon as Ee } from "@phosphor-icons/react";
import './index.css';var U = { exports: {} }, V = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var te;
function Ne() {
  if (te) return V;
  te = 1;
  var e = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function o(s, l, a) {
    var i = null;
    if (a !== void 0 && (i = "" + a), l.key !== void 0 && (i = "" + l.key), "key" in l) {
      a = {};
      for (var f in l)
        f !== "key" && (a[f] = l[f]);
    } else a = l;
    return l = a.ref, {
      $$typeof: e,
      type: s,
      key: i,
      ref: l !== void 0 ? l : null,
      props: a
    };
  }
  return V.Fragment = r, V.jsx = o, V.jsxs = o, V;
}
var X = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var le;
function pe() {
  return le || (le = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(n) {
      if (n == null) return null;
      if (typeof n == "function")
        return n.$$typeof === K ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case S:
          return "Fragment";
        case N:
          return "Profiler";
        case k:
          return "StrictMode";
        case Y:
          return "Suspense";
        case M:
          return "SuspenseList";
        case Q:
          return "Activity";
      }
      if (typeof n == "object")
        switch (typeof n.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), n.$$typeof) {
          case E:
            return "Portal";
          case w:
            return n.displayName || "Context";
          case T:
            return (n._context.displayName || "Context") + ".Consumer";
          case y:
            var c = n.render;
            return n = n.displayName, n || (n = c.displayName || c.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
          case $:
            return c = n.displayName || null, c !== null ? c : e(n.type) || "Memo";
          case R:
            c = n._payload, n = n._init;
            try {
              return e(n(c));
            } catch {
            }
        }
      return null;
    }
    function r(n) {
      return "" + n;
    }
    function o(n) {
      try {
        r(n);
        var c = !1;
      } catch {
        c = !0;
      }
      if (c) {
        c = console;
        var C = c.error, h = typeof Symbol == "function" && Symbol.toStringTag && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return C.call(
          c,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          h
        ), r(n);
      }
    }
    function s(n) {
      if (n === S) return "<>";
      if (typeof n == "object" && n !== null && n.$$typeof === R)
        return "<...>";
      try {
        var c = e(n);
        return c ? "<" + c + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function l() {
      var n = I.A;
      return n === null ? null : n.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function i(n) {
      if (q.call(n, "key")) {
        var c = Object.getOwnPropertyDescriptor(n, "key").get;
        if (c && c.isReactWarning) return !1;
      }
      return n.key !== void 0;
    }
    function f(n, c) {
      function C() {
        L || (L = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          c
        ));
      }
      C.isReactWarning = !0, Object.defineProperty(n, "key", {
        get: C,
        configurable: !0
      });
    }
    function d() {
      var n = e(this.type);
      return z[n] || (z[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function u(n, c, C, h, H, D) {
      var g = C.ref;
      return n = {
        $$typeof: j,
        type: n,
        key: c,
        props: C,
        _owner: h
      }, (g !== void 0 ? g : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: !1,
        get: d
      }) : Object.defineProperty(n, "ref", { enumerable: !1, value: null }), n._store = {}, Object.defineProperty(n._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(n, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(n, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: H
      }), Object.defineProperty(n, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: D
      }), Object.freeze && (Object.freeze(n.props), Object.freeze(n)), n;
    }
    function m(n, c, C, h, H, D) {
      var g = c.children;
      if (g !== void 0)
        if (h)
          if (G(g)) {
            for (h = 0; h < g.length; h++)
              v(g[h]);
            Object.freeze && Object.freeze(g);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else v(g);
      if (q.call(c, "key")) {
        g = e(n);
        var W = Object.keys(c).filter(function(he) {
          return he !== "key";
        });
        h = 0 < W.length ? "{key: someKey, " + W.join(": ..., ") + ": ...}" : "{key: someKey}", re[g + h] || (W = 0 < W.length ? "{" + W.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          h,
          g,
          W,
          g
        ), re[g + h] = !0);
      }
      if (g = null, C !== void 0 && (o(C), g = "" + C), i(c) && (o(c.key), g = "" + c.key), "key" in c) {
        C = {};
        for (var ee in c)
          ee !== "key" && (C[ee] = c[ee]);
      } else C = c;
      return g && f(
        C,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), u(
        n,
        g,
        C,
        l(),
        H,
        D
      );
    }
    function v(n) {
      b(n) ? n._store && (n._store.validated = 1) : typeof n == "object" && n !== null && n.$$typeof === R && (n._payload.status === "fulfilled" ? b(n._payload.value) && n._payload.value._store && (n._payload.value._store.validated = 1) : n._store && (n._store.validated = 1));
    }
    function b(n) {
      return typeof n == "object" && n !== null && n.$$typeof === j;
    }
    var x = B, j = Symbol.for("react.transitional.element"), E = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), T = Symbol.for("react.consumer"), w = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), Y = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), Q = Symbol.for("react.activity"), K = Symbol.for("react.client.reference"), I = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = Object.prototype.hasOwnProperty, G = Array.isArray, A = console.createTask ? console.createTask : function() {
      return null;
    };
    x = {
      react_stack_bottom_frame: function(n) {
        return n();
      }
    };
    var L, z = {}, J = x.react_stack_bottom_frame.bind(
      x,
      a
    )(), F = A(s(a)), re = {};
    X.Fragment = S, X.jsx = function(n, c, C) {
      var h = 1e4 > I.recentlyCreatedOwnerStacks++;
      return m(
        n,
        c,
        C,
        !1,
        h ? Error("react-stack-top-frame") : J,
        h ? A(s(n)) : F
      );
    }, X.jsxs = function(n, c, C) {
      var h = 1e4 > I.recentlyCreatedOwnerStacks++;
      return m(
        n,
        c,
        C,
        !0,
        h ? Error("react-stack-top-frame") : J,
        h ? A(s(n)) : F
      );
    };
  })()), X;
}
var se;
function Se() {
  return se || (se = 1, process.env.NODE_ENV === "production" ? U.exports = Ne() : U.exports = pe()), U.exports;
}
var t = Se();
const _e = ({
  open: e,
  onClose: r,
  onConfirm: o,
  message: s = "Are you sure you want to initiate this call?"
}) => e ? /* @__PURE__ */ t.jsx("div", { className: "cw-modal-overlay", onClick: r, children: /* @__PURE__ */ t.jsxs("div", { className: "cw-modal-container cw-confirmation-container", onClick: (l) => l.stopPropagation(), children: [
  /* @__PURE__ */ t.jsxs("div", { className: "cw-modal-header", children: [
    /* @__PURE__ */ t.jsx("div", { className: "cw-modal-title", children: "Confirm Call" }),
    /* @__PURE__ */ t.jsx("button", { className: "cw-modal-close", onClick: r, "aria-label": "Close", children: "✕" })
  ] }),
  /* @__PURE__ */ t.jsxs("div", { className: "cw-modal-body cw-confirmation-body", children: [
    /* @__PURE__ */ t.jsx("p", { className: "cw-confirmation-message", children: s }),
    /* @__PURE__ */ t.jsxs("div", { className: "cw-confirmation-actions", children: [
      /* @__PURE__ */ t.jsx("button", { className: "cw-btn cw-btn-secondary", onClick: r, children: "No" }),
      /* @__PURE__ */ t.jsx("button", { className: "cw-btn cw-btn-primary", onClick: o, children: "Yes" })
    ] })
  ] })
] }) }) : null, ie = (e) => /* @__PURE__ */ t.jsx(we, { ...e }), Te = (e) => /* @__PURE__ */ t.jsx(xe, { ...e }), ye = (e) => /* @__PURE__ */ t.jsx(be, { ...e }), ce = (e) => /* @__PURE__ */ t.jsx(je, { weight: "fill", ...e }), Re = (e) => /* @__PURE__ */ t.jsx(Ee, { ...e }), oe = ({
  open: e,
  onClose: r,
  header: o,
  children: s,
  width: l = "400px",
  closable: a = !0,
  className: i = "",
  dismissableMask: f = !0,
  modal: d = !0,
  draggable: u = !1,
  position: m = "center"
}) => {
  const [v, b] = B.useState({ x: 0, y: 0 }), [x, j] = B.useState(!1), E = B.useRef(null);
  P(() => (e ? d && (document.body.style.overflow = "hidden") : (document.body.style.overflow = "unset", b({ x: 0, y: 0 })), () => {
    document.body.style.overflow = "unset";
  }), [e, d]);
  const S = (N) => {
    u && j(!0);
  };
  if (P(() => {
    const N = (w) => {
      x && b((y) => ({
        x: y.x + w.movementX,
        y: y.y + w.movementY
      }));
    }, T = () => j(!1);
    return x && (window.addEventListener("mousemove", N), window.addEventListener("mouseup", T)), () => {
      window.removeEventListener("mousemove", N), window.removeEventListener("mouseup", T);
    };
  }, [x]), !e) return null;
  const k = m !== "center";
  return /* @__PURE__ */ t.jsx(
    "div",
    {
      className: `cw-modal-overlay ${k ? "cw-fixed" : ""} cw-pos-${m} ${i}`,
      onClick: f && a ? r : void 0,
      children: /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: E,
          className: "cw-modal-container",
          style: {
            maxWidth: l,
            transform: `translate(${v.x}px, ${v.y}px)`,
            cursor: x ? "grabbing" : "auto"
          },
          onClick: (N) => N.stopPropagation(),
          children: [
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                className: "cw-modal-header",
                onMouseDown: S,
                style: { cursor: u ? "grab" : "default" },
                children: [
                  /* @__PURE__ */ t.jsx("div", { className: "cw-modal-title", children: o }),
                  a && /* @__PURE__ */ t.jsx("button", { className: "cw-modal-close", onClick: r, "aria-label": "Close", children: /* @__PURE__ */ t.jsx(Re, { size: 18 }) })
                ]
              }
            ),
            /* @__PURE__ */ t.jsx("div", { className: "cw-modal-body", children: s })
          ]
        }
      )
    }
  );
}, ne = ({
  label: e,
  icon: r,
  onClick: o,
  type: s = "button",
  disabled: l = !1,
  className: a = "",
  color: i,
  style: f,
  ...d
}) => /* @__PURE__ */ t.jsxs(
  "button",
  {
    type: s,
    onClick: o,
    disabled: l,
    className: `cw-btn ${a}`,
    style: { ...f, ...i ? { backgroundColor: i } : {} },
    ...d,
    children: [
      r && /* @__PURE__ */ t.jsx("span", { className: "cw-btn-icon", children: r }),
      e && /* @__PURE__ */ t.jsx("span", { className: "cw-btn-label", children: e })
    ]
  }
);
function Z(e) {
  switch (e == null ? void 0 : e.toLowerCase()) {
    case "in-progress":
      return { bgColor: "#2196F3", textColor: "#ffffff" };
    case "calling":
      return { bgColor: "#4CAF50", textColor: "#ffffff" };
    case "completed":
      return { bgColor: "#e3f2fd", textColor: "#1565c0" };
    case "failed":
    case "busy":
    case "no-answer":
    case "canceled":
    case "cancelled":
      return { bgColor: "#ffebee", textColor: "#c62828" };
    case "incomplete":
      return { bgColor: "#fafafa", textColor: "#616161" };
    default:
      return { bgColor: "#f5f5f5", textColor: "#424242" };
  }
}
function ue(e) {
  return e ? e.replace(/[^\d+]/g, "") : "";
}
function Ve(e) {
  const r = Math.floor(e / 60), o = e % 60;
  return `${String(r).padStart(2, "0")}:${String(o).padStart(2, "0")}`;
}
function Oe({ callData: e }) {
  return /* @__PURE__ */ t.jsxs("div", { className: "call-received-header", children: [
    /* @__PURE__ */ t.jsx(ce, { size: 25, color: "#FF7575" }),
    (e == null ? void 0 : e.Status) && /* @__PURE__ */ t.jsx(
      "div",
      {
        className: "call-status-badge",
        style: {
          backgroundColor: Z(e.Status).bgColor,
          color: Z(e.Status).textColor
        },
        children: e.Status
      }
    )
  ] });
}
const ae = "#175353", Pe = ({
  contactName: e,
  callData: r,
  onEndCall: o,
  onEdit: s,
  onScheduleReminder: l
}) => {
  const a = p(() => {
    const i = r == null ? void 0 : r.Status;
    return i === "failed" || i === "incomplete" || i === "no-answer" || i === "busy" || i === "canceled" || i === "completed";
  }, [r == null ? void 0 : r.Status]);
  return P(() => {
    if (!a || !(r != null && r.Status)) return;
    const i = setTimeout(o, 1e4);
    return () => clearTimeout(i);
  }, [r == null ? void 0 : r.Status]), /* @__PURE__ */ t.jsxs("div", { className: "call-received-modal", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "call-received-content", children: [
      e && /* @__PURE__ */ t.jsx("div", { className: "caller-name", children: e }),
      (r == null ? void 0 : r.Status) === "in-progress" && /* @__PURE__ */ t.jsx("div", { className: "calling-indicator", children: /* @__PURE__ */ t.jsx("span", { className: "calling-text", children: "Calling..." }) }),
      r && /* @__PURE__ */ t.jsx("div", { className: "call-details", children: /* @__PURE__ */ t.jsxs("div", { className: "call-phone-info", children: [
        /* @__PURE__ */ t.jsx("span", { className: "call-label", children: "To:" }),
        /* @__PURE__ */ t.jsx("span", { className: "call-phone", children: ue(r.To) })
      ] }) })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "call-controls", children: [
      s && /* @__PURE__ */ t.jsx(
        ne,
        {
          icon: /* @__PURE__ */ t.jsx("span", { className: "cursor-pointer", children: /* @__PURE__ */ t.jsx(Te, { size: 24, color: ae }) }),
          onClick: s,
          type: "button",
          className: "call-control-button"
        }
      ),
      l && /* @__PURE__ */ t.jsx(
        ne,
        {
          icon: /* @__PURE__ */ t.jsx("span", { className: "cursor-pointer", children: /* @__PURE__ */ t.jsx(ye, { size: 24, color: ae }) }),
          onClick: l,
          type: "button",
          className: "call-control-button"
        }
      )
    ] })
  ] });
};
function ke({ callData: e }) {
  const r = p(() => e ? e.DialCallStatus || e.Status || "in-progress" : null, [e]);
  return /* @__PURE__ */ t.jsxs("div", { className: "incoming-call-header", children: [
    /* @__PURE__ */ t.jsx(ce, { size: 25, color: "#FF7575" }),
    r && /* @__PURE__ */ t.jsx(
      "div",
      {
        className: "call-status-badge",
        style: {
          backgroundColor: Z(r).bgColor,
          color: Z(r).textColor
        },
        children: r
      }
    )
  ] });
}
const Ie = ({
  contactName: e,
  callData: r,
  onAccept: o,
  onEndCall: s
}) => {
  const l = p(() => r ? r.DialCallStatus || r.Status || "in-progress" : null, [r]), a = p(() => l === "no-answer" || l === "incomplete" || l === "completed" || l === "busy" || l === "failed" || l === "canceled", [l]);
  return P(() => {
    if (!a || !l) return;
    const i = setTimeout(s, 1e4);
    return () => clearTimeout(i);
  }, [l]), /* @__PURE__ */ t.jsxs("div", { className: "incoming-call-modal", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "incoming-call-content", children: [
      e && /* @__PURE__ */ t.jsx("div", { className: "caller-name", children: e }),
      /* @__PURE__ */ t.jsx("div", { className: "incoming-call-text", children: "Incoming call" }),
      r && /* @__PURE__ */ t.jsxs("div", { className: "call-details", children: [
        (r.CallFrom || r.From) && /* @__PURE__ */ t.jsxs("div", { className: "call-phone-info", children: [
          /* @__PURE__ */ t.jsx("span", { className: "call-label", children: "From:" }),
          /* @__PURE__ */ t.jsx("span", { className: "call-phone", children: ue(r.CallFrom || r.From) })
        ] }),
        r.AgentEmail && /* @__PURE__ */ t.jsxs("div", { className: "call-phone-info", children: [
          /* @__PURE__ */ t.jsx("span", { className: "call-label", children: "Agent:" }),
          /* @__PURE__ */ t.jsx("span", { className: "call-phone", children: r.AgentEmail })
        ] })
      ] })
    ] }),
    !a && /* @__PURE__ */ t.jsx("div", { className: "incoming-call-controls", children: /* @__PURE__ */ t.jsx(
      ne,
      {
        icon: /* @__PURE__ */ t.jsx("span", { className: "cursor-pointer", children: /* @__PURE__ */ t.jsx(ie, { size: 24, color: "#ffffff" }) }),
        onClick: o,
        type: "button",
        className: "incoming-call-button",
        style: { backgroundColor: "#10b981" }
      }
    ) })
  ] });
}, de = ve(void 0), Me = ({
  apiAdapter: e,
  config: r,
  socketAdapter: o,
  socketPayload: s,
  children: l
}) => /* @__PURE__ */ t.jsx(de.Provider, { value: { apiAdapter: e, config: r, socketAdapter: o, socketPayload: s }, children: l }), $e = () => {
  const e = ge(de);
  if (!e) throw new Error("useCallWidgetConfig must be used within a <CallWidgetProvider>");
  return e;
}, fe = /* @__PURE__ */ new Set([
  "completed",
  "failed",
  "busy",
  "no-answer",
  "canceled",
  "incomplete"
]);
function Ae(e, r, o, s) {
  const [l, a] = O(null), i = _(
    (d) => {
      if (d.event !== "exotel_call" || !d.message) return;
      const u = d.message;
      e && u.CallSid && u.CallSid !== e || (a(u), s == null || s(u));
    },
    [e, s]
  );
  P(() => {
    if (!(r != null && r.onCallEvent)) return;
    const d = (u) => i(u);
    return r.onCallEvent(d), () => r.offCallEvent(d);
  }, [r, i]), P(() => {
    !o || r != null && r.onCallEvent || i(o);
  }, [o, r, i]);
  const f = (l == null ? void 0 : l.Status) != null && fe.has(l.Status);
  return { callStatus: l, isTerminalStatus: f };
}
function Fe(e, r, o) {
  const [s, l] = O(null), a = _(
    (u) => {
      if (u.event !== "exotel_call" || !u.message) return;
      const m = u.message;
      m.Direction === "incoming" && (l(m), o == null || o(m));
    },
    [o]
  );
  P(() => {
    if (!(e != null && e.onCallEvent)) return;
    const u = (m) => a(m);
    return e.onCallEvent(u), () => e.offCallEvent(u);
  }, [e, a]), P(() => {
    !r || e != null && e.onCallEvent || a(r);
  }, [r, e, a]);
  const i = (s == null ? void 0 : s.DialCallStatus) || (s == null ? void 0 : s.Status) || null, f = i != null && fe.has(i), d = _(() => l(null), []);
  return { incomingCall: s, isTerminalStatus: f, displayStatus: i, clearIncomingCall: d };
}
function We() {
  const { apiAdapter: e, config: r, socketAdapter: o, socketPayload: s } = $e(), [l, a] = O(null), [i, f] = O(null), [d, u] = O(!1), [m, v] = O(!1), [b, x] = O(!1), [j, E] = O(!1), { callStatus: S, isTerminalStatus: k } = Ae(
    i,
    o,
    s,
    (I) => {
      a(I);
    }
  ), { incomingCall: N, isTerminalStatus: T, clearIncomingCall: w } = Fe(
    o,
    s,
    () => {
      E(!0);
    }
  ), y = _(() => {
    v(!0);
  }, []), Y = _(
    async (I, q) => {
      var A, L, z;
      const G = I || r.defaultPhone;
      if (!G) {
        (A = e.showWarning) == null || A.call(e, "No Number", "No phone number provided.");
        return;
      }
      v(!1), u(!0);
      try {
        const F = (await e.makeCall(G, q ?? r.links)).message;
        a(F), f(F.CallSid || F.Sid || null), x(!0), (L = e.showNotification) == null || L.call(e, "Call", "Call initiated successfully.");
      } catch (J) {
        console.error("Failed to initiate call:", J), (z = e.showError) == null || z.call(e, "Call Failed", "Could not initiate the call. Please try again.");
      } finally {
        u(!1);
      }
    },
    [e, r]
  ), M = _(() => {
    v(!1);
  }, []), $ = _(() => {
    x(!1), a(null), f(null);
  }, []), R = _(() => {
  }, []), Q = _(() => {
    E(!1), w();
  }, [w]), K = _(() => {
    E(!1), w();
  }, [w]);
  return {
    // Outgoing
    callData: S ?? l,
    callSid: i,
    isCallPending: d,
    isTerminalStatus: k,
    isCallConfirmationOpen: m,
    isCallReceivedModalOpen: b,
    // Incoming
    incomingCallData: N,
    isIncomingCallTerminalStatus: T,
    isIncomingCallModalOpen: j,
    // Actions
    handleCallClick: y,
    handleConfirmCall: Y,
    handleCancelCall: M,
    handleEndCall: $,
    handleAcceptCall: R,
    handleDeclineCall: Q,
    handleEndIncomingCall: K
  };
}
const me = (e = "/", r) => {
  const o = {
    "Content-Type": "application/json"
  };
  r && (o.Authorization = `token ${r}`);
  const s = async (l, a = {}) => {
    const i = { ...o };
    if (a.headers) {
      const u = new Headers(a.headers);
      Object.assign(i, Object.fromEntries(u.entries()));
    }
    const f = l.startsWith("http") ? l : `${e.replace(/\/$/, "")}${l}`, d = await fetch(f, { ...a, headers: i });
    if (!d.ok)
      throw new Error(`API Error: ${d.status} ${d.statusText}`);
    return d.json();
  };
  return {
    get: (l) => s(l, { method: "GET" }),
    post: (l, a) => s(l, {
      method: "POST",
      body: a !== void 0 ? JSON.stringify(a) : void 0
    })
  };
}, Ce = (e) => ({
  /**
   * Initiate an outgoing call via Exotel.
   * Endpoint: /api/method/crm_integration.crm_exotel.api.handler.make_a_call
   */
  makeCall: async (r, o) => {
    const s = new URLSearchParams();
    s.set("to_number", r), o != null && o.length && s.set("links", JSON.stringify(o));
    const l = `/api/method/crm_integration.crm_exotel.api.handler.make_a_call?${s.toString()}`;
    return e.get(l);
  }
});
function Ye({
  apiAdapter: e,
  config: r,
  socketAdapter: o,
  baseURL: s,
  token: l,
  phone: a,
  links: i = [],
  socketPayload: f,
  socketConnected: d,
  showNotification: u,
  showWarning: m,
  showError: v
}) {
  const b = p(() => {
    if (e) return e;
    if (s) {
      const E = me(s, l);
      return {
        ...Ce(E),
        showNotification: u,
        showWarning: m,
        showError: v
      };
    }
  }, [e, s, l, u, m, v]), x = p(() => r || {
    defaultPhone: a || "",
    links: i
  }, [r, a, i]), j = p(() => {
    if (o) return o;
  }, [o]);
  return {
    apiAdapter: b,
    config: x,
    finalSocketAdapter: j,
    socketPayload: d !== !1 ? f : void 0
  };
}
const Le = ({
  contactName: e,
  onEdit: r,
  onScheduleReminder: o,
  onMute: s,
  onToggleSpeaker: l,
  buttonLabel: a = "Call",
  icon: i,
  btnClassName: f = "",
  variant: d = "default"
}) => {
  const {
    callData: u,
    isCallPending: m,
    isTerminalStatus: v,
    isCallConfirmationOpen: b,
    isCallReceivedModalOpen: x,
    incomingCallData: j,
    isIncomingCallTerminalStatus: E,
    isIncomingCallModalOpen: S,
    handleCallClick: k,
    handleConfirmCall: N,
    handleCancelCall: T,
    handleEndCall: w,
    handleAcceptCall: y,
    handleDeclineCall: Y,
    handleEndIncomingCall: M
  } = We(), $ = () => {
    k();
  }, R = i || /* @__PURE__ */ t.jsx(ie, { size: 20, color: "#175353" });
  return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    d === "plain" ? /* @__PURE__ */ t.jsx(
      "button",
      {
        className: `${f}`,
        onClick: $,
        disabled: m,
        type: "button",
        title: a,
        children: m ? "..." : R
      }
    ) : /* @__PURE__ */ t.jsxs(
      "div",
      {
        className: `contact-button ${f} ${m ? "cw-pending" : ""}`,
        onClick: m ? void 0 : $,
        title: a,
        children: [
          /* @__PURE__ */ t.jsx("div", { className: "contact-icon-wrapper", children: R }),
          /* @__PURE__ */ t.jsx("span", { children: m ? "Calling..." : a })
        ]
      }
    ),
    /* @__PURE__ */ t.jsx(
      _e,
      {
        open: b,
        onClose: T,
        onConfirm: () => N()
      }
    ),
    /* @__PURE__ */ t.jsx(
      oe,
      {
        open: x,
        onClose: w,
        header: /* @__PURE__ */ t.jsx(Oe, { callData: u }),
        width: "400px",
        closable: v,
        dismissableMask: !1,
        className: "cw-modal-received-wrapper cw-no-header-border",
        modal: !1,
        draggable: !0,
        position: "bottom-left",
        children: /* @__PURE__ */ t.jsx(
          Pe,
          {
            contactName: e,
            callData: u,
            onEndCall: w,
            onEdit: r,
            onScheduleReminder: o,
            onMute: s,
            onToggleSpeaker: l
          }
        )
      }
    ),
    /* @__PURE__ */ t.jsx(
      oe,
      {
        open: S,
        onClose: M,
        header: /* @__PURE__ */ t.jsx(ke, { callData: j }),
        width: "400px",
        closable: E,
        dismissableMask: !1,
        className: "cw-modal-incoming-wrapper cw-no-header-border",
        modal: !1,
        draggable: !0,
        position: "bottom-right",
        children: /* @__PURE__ */ t.jsx(
          Ie,
          {
            contactName: e,
            callData: j,
            onAccept: y,
            onDecline: Y,
            onEndCall: M
          }
        )
      }
    )
  ] });
}, Xe = (e) => {
  const {
    apiAdapter: r,
    config: o,
    finalSocketAdapter: s,
    socketPayload: l
  } = Ye({
    apiAdapter: e.apiAdapter,
    config: e.config,
    socketAdapter: e.socketAdapter,
    baseURL: e.baseURL,
    token: e.token,
    phone: e.phone,
    links: e.links,
    socketPayload: e.socketPayload,
    socketConnected: e.socketConnected,
    showNotification: e.showNotification,
    showWarning: e.showWarning,
    showError: e.showError
  });
  return r ? /* @__PURE__ */ t.jsx(
    Me,
    {
      apiAdapter: r,
      config: o,
      socketAdapter: s,
      socketPayload: l,
      children: /* @__PURE__ */ t.jsx(
        Le,
        {
          contactName: e.contactName,
          onEdit: e.onEdit,
          onScheduleReminder: e.onScheduleReminder,
          onMute: e.onMute,
          onToggleSpeaker: e.onToggleSpeaker,
          buttonLabel: e.buttonLabel,
          icon: e.icon,
          btnClassName: e.btnClassName,
          variant: e.variant
        }
      )
    }
  ) : null;
};
function qe({
  baseURL: e = "/",
  token: r,
  defaultPhone: o,
  links: s,
  showNotification: l,
  showWarning: a,
  showError: i
}) {
  const f = p(
    () => me(e, r),
    [e, r]
  ), d = p(() => Ce(f), [f]), u = p(
    () => ({
      makeCall: (v, b) => d.makeCall(v, b ?? s),
      showNotification: l,
      showWarning: a,
      showError: i
    }),
    [d, s, l, a, i]
  ), m = p(
    () => ({
      defaultPhone: o,
      links: s,
      apiBaseUrl: e
    }),
    [o, s, e]
  );
  return { apiAdapter: u, config: m };
}
export {
  _e as CallConfirmationModal,
  Pe as CallReceivedModal,
  Oe as CallReceivedModalHeader,
  Me as CallWidgetProvider,
  Xe as CallWidgetTrigger,
  Ie as IncomingCallModal,
  ke as IncomingCallModalHeader,
  fe as TERMINAL_CALL_STATUSES,
  Ce as callApi,
  me as createDefaultCallApiClient,
  Ve as formatCallDuration,
  ue as formatPhoneNumber,
  Z as getBadgeColor,
  Ae as useCallStatus,
  $e as useCallWidgetConfig,
  We as useCallWidgetLogic,
  qe as useDefaultCallAdapter,
  Fe as useIncomingCall
};
