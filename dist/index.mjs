import Q, { useEffect as k, useMemo as S, useContext as ge, createContext as ve, useState as O, useCallback as y } from "react";
import { NotePencilIcon as xe, CalendarIcon as be, Record as je, Phone as we, XIcon as Ee } from "@phosphor-icons/react";
import './index.css';var Z = { exports: {} }, G = {};
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
  if (te) return G;
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
  return G.Fragment = r, G.jsx = o, G.jsxs = o, G;
}
var H = {};
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
function Se() {
  return le || (le = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(n) {
      if (n == null) return null;
      if (typeof n == "function")
        return n.$$typeof === R ? null : n.displayName || n.name || null;
      if (typeof n == "string") return n;
      switch (n) {
        case p:
          return "Fragment";
        case w:
          return "Profiler";
        case I:
          return "StrictMode";
        case J:
          return "Suspense";
        case B:
          return "SuspenseList";
        case F:
          return "Activity";
      }
      if (typeof n == "object")
        switch (typeof n.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), n.$$typeof) {
          case j:
            return "Portal";
          case N:
            return n.displayName || "Context";
          case P:
            return (n._context.displayName || "Context") + ".Consumer";
          case T:
            var c = n.render;
            return n = n.displayName, n || (n = c.displayName || c.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
          case A:
            return c = n.displayName || null, c !== null ? c : e(n.type) || "Memo";
          case M:
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
        var m = c.error, h = typeof Symbol == "function" && Symbol.toStringTag && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return m.call(
          c,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          h
        ), r(n);
      }
    }
    function s(n) {
      if (n === p) return "<>";
      if (typeof n == "object" && n !== null && n.$$typeof === M)
        return "<...>";
      try {
        var c = e(n);
        return c ? "<" + c + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function l() {
      var n = _.A;
      return n === null ? null : n.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function i(n) {
      if ($.call(n, "key")) {
        var c = Object.getOwnPropertyDescriptor(n, "key").get;
        if (c && c.isReactWarning) return !1;
      }
      return n.key !== void 0;
    }
    function f(n, c) {
      function m() {
        V || (V = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          c
        ));
      }
      m.isReactWarning = !0, Object.defineProperty(n, "key", {
        get: m,
        configurable: !0
      });
    }
    function u() {
      var n = e(this.type);
      return X[n] || (X[n] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), n = this.props.ref, n !== void 0 ? n : null;
    }
    function d(n, c, m, h, U, D) {
      var g = m.ref;
      return n = {
        $$typeof: E,
        type: n,
        key: c,
        props: m,
        _owner: h
      }, (g !== void 0 ? g : null) !== null ? Object.defineProperty(n, "ref", {
        enumerable: !1,
        get: u
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
        value: U
      }), Object.defineProperty(n, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: D
      }), Object.freeze && (Object.freeze(n.props), Object.freeze(n)), n;
    }
    function C(n, c, m, h, U, D) {
      var g = c.children;
      if (g !== void 0)
        if (h)
          if (W(g)) {
            for (h = 0; h < g.length; h++)
              v(g[h]);
            Object.freeze && Object.freeze(g);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else v(g);
      if ($.call(c, "key")) {
        g = e(n);
        var z = Object.keys(c).filter(function(he) {
          return he !== "key";
        });
        h = 0 < z.length ? "{key: someKey, " + z.join(": ..., ") + ": ...}" : "{key: someKey}", re[g + h] || (z = 0 < z.length ? "{" + z.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          h,
          g,
          z,
          g
        ), re[g + h] = !0);
      }
      if (g = null, m !== void 0 && (o(m), g = "" + m), i(c) && (o(c.key), g = "" + c.key), "key" in c) {
        m = {};
        for (var ee in c)
          ee !== "key" && (m[ee] = c[ee]);
      } else m = c;
      return g && f(
        m,
        typeof n == "function" ? n.displayName || n.name || "Unknown" : n
      ), d(
        n,
        g,
        m,
        l(),
        U,
        D
      );
    }
    function v(n) {
      b(n) ? n._store && (n._store.validated = 1) : typeof n == "object" && n !== null && n.$$typeof === M && (n._payload.status === "fulfilled" ? b(n._payload.value) && n._payload.value._store && (n._payload.value._store.validated = 1) : n._store && (n._store.validated = 1));
    }
    function b(n) {
      return typeof n == "object" && n !== null && n.$$typeof === E;
    }
    var x = Q, E = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), N = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), A = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), F = Symbol.for("react.activity"), R = Symbol.for("react.client.reference"), _ = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = Object.prototype.hasOwnProperty, W = Array.isArray, Y = console.createTask ? console.createTask : function() {
      return null;
    };
    x = {
      react_stack_bottom_frame: function(n) {
        return n();
      }
    };
    var V, X = {}, q = x.react_stack_bottom_frame.bind(
      x,
      a
    )(), L = Y(s(a)), re = {};
    H.Fragment = p, H.jsx = function(n, c, m) {
      var h = 1e4 > _.recentlyCreatedOwnerStacks++;
      return C(
        n,
        c,
        m,
        !1,
        h ? Error("react-stack-top-frame") : q,
        h ? Y(s(n)) : L
      );
    }, H.jsxs = function(n, c, m) {
      var h = 1e4 > _.recentlyCreatedOwnerStacks++;
      return C(
        n,
        c,
        m,
        !0,
        h ? Error("react-stack-top-frame") : q,
        h ? Y(s(n)) : L
      );
    };
  })()), H;
}
var se;
function pe() {
  return se || (se = 1, process.env.NODE_ENV === "production" ? Z.exports = Ne() : Z.exports = Se()), Z.exports;
}
var t = pe();
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
] }) }) : null, ie = (e) => /* @__PURE__ */ t.jsx(we, { ...e }), ye = (e) => /* @__PURE__ */ t.jsx(xe, { ...e }), Te = (e) => /* @__PURE__ */ t.jsx(be, { ...e }), ce = (e) => /* @__PURE__ */ t.jsx(je, { weight: "fill", ...e }), Re = (e) => /* @__PURE__ */ t.jsx(Ee, { ...e }), oe = ({
  open: e,
  onClose: r,
  header: o,
  children: s,
  width: l = "400px",
  closable: a = !0,
  className: i = "",
  dismissableMask: f = !0,
  modal: u = !0,
  draggable: d = !1,
  position: C = "center"
}) => {
  const [v, b] = Q.useState({ x: 0, y: 0 }), [x, E] = Q.useState(!1), j = Q.useRef(null);
  k(() => (e ? u && (document.body.style.overflow = "hidden") : (document.body.style.overflow = "unset", b({ x: 0, y: 0 })), () => {
    document.body.style.overflow = "unset";
  }), [e, u]);
  const p = (w) => {
    d && E(!0);
  };
  if (k(() => {
    const w = (N) => {
      x && b((T) => ({
        x: T.x + N.movementX,
        y: T.y + N.movementY
      }));
    }, P = () => E(!1);
    return x && (window.addEventListener("mousemove", w), window.addEventListener("mouseup", P)), () => {
      window.removeEventListener("mousemove", w), window.removeEventListener("mouseup", P);
    };
  }, [x]), !e) return null;
  const I = C !== "center";
  return /* @__PURE__ */ t.jsx(
    "div",
    {
      className: `cw-modal-overlay ${I ? "cw-fixed" : ""} cw-pos-${C} ${i}`,
      onClick: f && a ? r : void 0,
      children: /* @__PURE__ */ t.jsxs(
        "div",
        {
          ref: j,
          className: "cw-modal-container",
          style: {
            maxWidth: l,
            transform: `translate(${v.x}px, ${v.y}px)`,
            cursor: x ? "grabbing" : "auto"
          },
          onClick: (w) => w.stopPropagation(),
          children: [
            /* @__PURE__ */ t.jsxs(
              "div",
              {
                className: "cw-modal-header",
                onMouseDown: p,
                style: { cursor: d ? "grab" : "default" },
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
  ...u
}) => /* @__PURE__ */ t.jsxs(
  "button",
  {
    type: s,
    onClick: o,
    disabled: l,
    className: `cw-btn ${a}`,
    style: { ...f, ...i ? { backgroundColor: i } : {} },
    ...u,
    children: [
      r && /* @__PURE__ */ t.jsx("span", { className: "cw-btn-icon", children: r }),
      e && /* @__PURE__ */ t.jsx("span", { className: "cw-btn-label", children: e })
    ]
  }
);
function K(e) {
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
function Be(e) {
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
          backgroundColor: K(e.Status).bgColor,
          color: K(e.Status).textColor
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
  const a = S(() => {
    const i = r == null ? void 0 : r.Status;
    return i === "failed" || i === "incomplete" || i === "no-answer" || i === "busy" || i === "canceled" || i === "completed";
  }, [r == null ? void 0 : r.Status]);
  return k(() => {
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
          icon: /* @__PURE__ */ t.jsx("span", { className: "cursor-pointer", children: /* @__PURE__ */ t.jsx(ye, { size: 24, color: ae }) }),
          onClick: s,
          type: "button",
          className: "call-control-button"
        }
      ),
      l && /* @__PURE__ */ t.jsx(
        ne,
        {
          icon: /* @__PURE__ */ t.jsx("span", { className: "cursor-pointer", children: /* @__PURE__ */ t.jsx(Te, { size: 24, color: ae }) }),
          onClick: l,
          type: "button",
          className: "call-control-button"
        }
      )
    ] })
  ] });
};
function ke({ callData: e }) {
  const r = S(() => e ? e.DialCallStatus || e.Status || "in-progress" : null, [e]);
  return /* @__PURE__ */ t.jsxs("div", { className: "incoming-call-header", children: [
    /* @__PURE__ */ t.jsx(ce, { size: 25, color: "#FF7575" }),
    r && /* @__PURE__ */ t.jsx(
      "div",
      {
        className: "call-status-badge",
        style: {
          backgroundColor: K(r).bgColor,
          color: K(r).textColor
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
  const l = S(() => r ? r.DialCallStatus || r.Status || "in-progress" : null, [r]), a = S(() => l === "no-answer" || l === "incomplete" || l === "completed" || l === "busy" || l === "failed" || l === "canceled", [l]);
  return k(() => {
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
  const [l, a] = O(null), i = y(
    (u) => {
      if (u.event !== "exotel_call" || !u.message) return;
      const d = u.message;
      e && d.CallSid && d.CallSid !== e || (a(d), s == null || s(d));
    },
    [e, s]
  );
  k(() => {
    if (!(r != null && r.onCallEvent)) return;
    const u = (d) => i(d);
    return r.onCallEvent(u), () => r.offCallEvent(u);
  }, [r, i]), k(() => {
    !o || r != null && r.onCallEvent || i(o);
  }, [o, r, i]);
  const f = (l == null ? void 0 : l.Status) != null && fe.has(l.Status);
  return { callStatus: l, isTerminalStatus: f };
}
function Fe(e, r, o) {
  const [s, l] = O(null), a = y(
    (d) => {
      if (d.event !== "exotel_call" || !d.message) return;
      const C = d.message;
      C.Direction === "incoming" && (l(C), o == null || o(C));
    },
    [o]
  );
  k(() => {
    if (!(e != null && e.onCallEvent)) return;
    const d = (C) => a(C);
    return e.onCallEvent(d), () => e.offCallEvent(d);
  }, [e, a]), k(() => {
    !r || e != null && e.onCallEvent || a(r);
  }, [r, e, a]);
  const i = (s == null ? void 0 : s.DialCallStatus) || (s == null ? void 0 : s.Status) || null, f = i != null && fe.has(i), u = y(() => l(null), []);
  return { incomingCall: s, isTerminalStatus: f, displayStatus: i, clearIncomingCall: u };
}
function We() {
  const { apiAdapter: e, config: r, socketAdapter: o, socketPayload: s } = $e(), [l, a] = O(null), [i, f] = O(null), [u, d] = O(!1), [C, v] = O(!1), [b, x] = O(!1), [E, j] = O(!1), { callStatus: p, isTerminalStatus: I } = Ae(
    i,
    o,
    s,
    (_) => {
      a(_);
    }
  ), { incomingCall: w, isTerminalStatus: P, clearIncomingCall: N } = Fe(
    o,
    s,
    () => {
      j(!0);
    }
  ), T = y(() => {
    v(!0);
  }, []), J = y(
    async (_, $) => {
      var Y, V, X;
      const W = _ || r.defaultPhone;
      if (!W) {
        (Y = e.showWarning) == null || Y.call(e, "No Number", "No phone number provided.");
        return;
      }
      v(!1), d(!0);
      try {
        const L = (await e.makeCall(W, $ ?? r.links)).message;
        a(L), f(L.CallSid || L.Sid || null), x(!0), (V = e.showNotification) == null || V.call(e, "Call", "Call initiated successfully.");
      } catch (q) {
        console.error("Failed to initiate call:", q), (X = e.showError) == null || X.call(e, "Call Failed", "Could not initiate the call. Please try again.");
      } finally {
        d(!1);
      }
    },
    [e, r]
  ), B = y(() => {
    v(!1);
  }, []), A = y(() => {
    x(!1), a(null), f(null);
  }, []), M = y(() => {
  }, []), F = y(() => {
    j(!1), N();
  }, [N]), R = y(() => {
    j(!1), N();
  }, [N]);
  return {
    // Outgoing
    callData: p ?? l,
    callSid: i,
    isCallPending: u,
    isTerminalStatus: I,
    isCallConfirmationOpen: C,
    isCallReceivedModalOpen: b,
    // Incoming
    incomingCallData: w,
    isIncomingCallTerminalStatus: P,
    isIncomingCallModalOpen: E,
    // Actions
    handleCallClick: T,
    handleConfirmCall: J,
    handleCancelCall: B,
    handleEndCall: A,
    handleAcceptCall: M,
    handleDeclineCall: F,
    handleEndIncomingCall: R
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
      const d = new Headers(a.headers);
      Object.assign(i, Object.fromEntries(d.entries()));
    }
    const f = l.startsWith("http") ? l : `${e.replace(/\/$/, "")}${l}`, u = await fetch(f, { ...a, headers: i });
    if (!u.ok)
      throw new Error(`API Error: ${u.status} ${u.statusText}`);
    return u.json();
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
  socketConnected: u,
  showNotification: d,
  showWarning: C,
  showError: v
}) {
  const b = S(() => {
    if (e) return e;
    if (s) {
      const j = me(s, l);
      return {
        ...Ce(j),
        showNotification: d,
        showWarning: C,
        showError: v
      };
    }
  }, [e, s, l, d, C, v]), x = S(() => r || {
    defaultPhone: a || "",
    links: i
  }, [r, a, i]), E = S(() => {
    if (o) return o;
  }, [o]);
  return {
    apiAdapter: b,
    config: x,
    finalSocketAdapter: E,
    socketPayload: u !== !1 ? f : void 0
  };
}
const Le = ({
  contactName: e,
  onBeforeCall: r,
  onEdit: o,
  onScheduleReminder: s,
  onMute: l,
  onToggleSpeaker: a,
  buttonLabel: i = "Call",
  icon: f,
  btnClassName: u = "",
  variant: d = "default"
}) => {
  const {
    callData: C,
    isCallPending: v,
    isTerminalStatus: b,
    isCallConfirmationOpen: x,
    isCallReceivedModalOpen: E,
    incomingCallData: j,
    isIncomingCallTerminalStatus: p,
    isIncomingCallModalOpen: I,
    handleCallClick: w,
    handleConfirmCall: P,
    handleCancelCall: N,
    handleEndCall: T,
    handleAcceptCall: J,
    handleDeclineCall: B,
    handleEndIncomingCall: A
  } = We(), [M, F] = O(!1), R = v || M, _ = async () => {
    if (!R) {
      if (!r) {
        w();
        return;
      }
      F(!0);
      try {
        await r() && w();
      } catch (W) {
        console.error("onBeforeCall failed:", W);
      } finally {
        F(!1);
      }
    }
  }, $ = f || /* @__PURE__ */ t.jsx(ie, { size: 20, color: "#175353" });
  return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    d === "plain" ? /* @__PURE__ */ t.jsx(
      "button",
      {
        className: `${u}`,
        onClick: _,
        disabled: R,
        type: "button",
        title: i,
        children: R ? "..." : $
      }
    ) : /* @__PURE__ */ t.jsxs(
      "div",
      {
        className: `contact-button ${u} ${R ? "cw-pending" : ""}`,
        onClick: R ? void 0 : _,
        title: i,
        children: [
          /* @__PURE__ */ t.jsx("div", { className: "contact-icon-wrapper", children: $ }),
          /* @__PURE__ */ t.jsx("span", { children: v ? "Calling..." : i })
        ]
      }
    ),
    /* @__PURE__ */ t.jsx(
      _e,
      {
        open: x,
        onClose: N,
        onConfirm: () => P()
      }
    ),
    /* @__PURE__ */ t.jsx(
      oe,
      {
        open: E,
        onClose: T,
        header: /* @__PURE__ */ t.jsx(Oe, { callData: C }),
        width: "400px",
        closable: b,
        dismissableMask: !1,
        className: "cw-modal-received-wrapper cw-no-header-border",
        modal: !1,
        draggable: !0,
        position: "bottom-left",
        children: /* @__PURE__ */ t.jsx(
          Pe,
          {
            contactName: e,
            callData: C,
            onEndCall: T,
            onEdit: o,
            onScheduleReminder: s,
            onMute: l,
            onToggleSpeaker: a
          }
        )
      }
    ),
    /* @__PURE__ */ t.jsx(
      oe,
      {
        open: I,
        onClose: A,
        header: /* @__PURE__ */ t.jsx(ke, { callData: j }),
        width: "400px",
        closable: p,
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
            onAccept: J,
            onDecline: B,
            onEndCall: A
          }
        )
      }
    )
  ] });
}, Ve = (e) => {
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
          onBeforeCall: e.onBeforeCall,
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
function Xe({
  baseURL: e = "/",
  token: r,
  defaultPhone: o,
  links: s,
  showNotification: l,
  showWarning: a,
  showError: i
}) {
  const f = S(
    () => me(e, r),
    [e, r]
  ), u = S(() => Ce(f), [f]), d = S(
    () => ({
      makeCall: (v, b) => u.makeCall(v, b ?? s),
      showNotification: l,
      showWarning: a,
      showError: i
    }),
    [u, s, l, a, i]
  ), C = S(
    () => ({
      defaultPhone: o,
      links: s,
      apiBaseUrl: e
    }),
    [o, s, e]
  );
  return { apiAdapter: d, config: C };
}
export {
  _e as CallConfirmationModal,
  Pe as CallReceivedModal,
  Oe as CallReceivedModalHeader,
  Me as CallWidgetProvider,
  Ve as CallWidgetTrigger,
  Ie as IncomingCallModal,
  ke as IncomingCallModalHeader,
  fe as TERMINAL_CALL_STATUSES,
  Ce as callApi,
  me as createDefaultCallApiClient,
  Be as formatCallDuration,
  ue as formatPhoneNumber,
  K as getBadgeColor,
  Ae as useCallStatus,
  $e as useCallWidgetConfig,
  We as useCallWidgetLogic,
  Xe as useDefaultCallAdapter,
  Fe as useIncomingCall
};
