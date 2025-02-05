
export const CB_BLACKLIST = [

  /mercadopago.com/,
  /analytics.twitter.com/,
  /snap.licdn.com/
]; 
 
var jsBlockedType = "javascript/blocked";
export let accepted_list = { 
  blacklist: CB_BLACKLIST,
  whitelist: window?.['SP_WHITELIST'],
};
export let unnacepted_list = {
  blacklisted: [],
},

p = new MutationObserver(function(t) {
  // alert("MutationObserver");
  
  for (var e = 0; e < t.length; e++)
    for (
      var i = t[e].addedNodes,
        n = function(t: number) {
          var n = i[t];
          if (1 === n.nodeType && "SCRIPT" === n['tagName']) {
            var e = n['src'],
              r = n['type'];
              console.log(n)
            if (validarSrcScript(e, r)) {
              unnacepted_list.blacklisted.push(n.cloneNode() as never),
                (n['type'] = jsBlockedType);
              n.addEventListener("beforescriptexecute", function t(e) {
                n["type"] === jsBlockedType &&
                  e.preventDefault(),
                  n.removeEventListener("beforescriptexecute", t);
              }),
                n.parentElement && n.parentElement.removeChild(n);
              }
            }
          },
          r = 0;
          r < i.length;
          r++
          )
          n(r);
});
p.observe(document.documentElement, {
  childList: !0,
  subtree: !0,
});

function validarSrcScript(src: any, type: string) {
  // accepted_list.blacklist = JSON.parse(localStorage.getItem("cb_security_blacklist")||"");
  // accepted_list.whitelist = JSON.parse(localStorage.getItem("cb_security_whitelist")||"");
  
  return (
    src &&
    (!type || type !== jsBlockedType) &&
    (!accepted_list.blacklist ||
      accepted_list.blacklist.some(function(t: { test: (arg0: any) => any; }) {
        if(t.test(src))
        //alert("accepted_list.blacklist : "+src +" "+t.test(src));
        return t.test(src);
      })) &&
    (!accepted_list.whitelist ||
      accepted_list.whitelist.every(function(t: { test: (arg0: any) => any; }) {
        if(t.test(src))
        //alert("accepted_list.whitelist : "+src +" "+t.test(src));
        return !t.test(src);
      }))
  )
}

 function validarScrElemento(elemento: Element) {
   var src = elemento.getAttribute("src");
  //  accepted_list.blacklist = JSON.parse(localStorage.getItem("cb_security_blacklist")||"");
  //  accepted_list.whitelist = JSON.parse(localStorage.getItem("cb_security_whitelist")||"");
   
    return (
      (accepted_list.blacklist &&
        accepted_list.blacklist.every(function(t: { test: (arg0: any) => any; }) {
          if(t.test(src))
          //alert("accepted_list.blacklist : "+src +" "+t.test(src));
          return !t.test(src);
        })) ||
      (accepted_list.whitelist &&
        accepted_list.whitelist.some(function(t: { test: (arg0: any) => any; }) {
          if(t.test(src))
          //alert("accepted_list.whitelist : "+src +" "+t.test(src));
          return t.test(src);
        }))

    )
}

function getArray(t: (RegExp | null)[]) {
  return (
    (function(t) {
      if (Array.isArray(t)) {
        for (var e = 0, n = new Array(t.length); e < t.length; e++)
          n[e] = t[e];
        return n;
      }
    })(t) ||
    (function(t) {
      if (
        Symbol.iterator in Object(t) ||
        "[object Arguments]" === Object.prototype.toString.call(t)
      )
        return Array.from(t);
    })(t) ||
    (function() {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance"
      );
    })()
  );
}
export module BlacklistService {
 
 var mp_document_createElement = document.createElement;
 
 document.createElement = function() {
  //  alert("document.createElement");
   for (var t = arguments.length, newArray = new Array(t), n = 0; n < t; n++)
     newArray[n] = arguments[n];
   if (
     typeof newArray[0] == "string" &&
     "script" !== newArray[0].toLowerCase()
   ) 
     return mp_document_createElement.bind(document).apply(void 0, newArray as any); // se o elemento criado não for um script, permitir.
        var bind_mp_document_createElement = mp_document_createElement
       .bind(document)
       .apply(void 0, newArray as any),
          bind_SetAttribute = bind_mp_document_createElement.setAttribute.bind(
            bind_mp_document_createElement
          );
   try {
     Object.defineProperties(bind_mp_document_createElement, { // Realizando monkey patch dos atributos do elemento criado
       src: {
         get: function() {
           return bind_mp_document_createElement.getAttribute("src");
         },
         set: function(value) {
           return (
             validarSrcScript(value, bind_mp_document_createElement['type']) &&
               bind_SetAttribute("type", jsBlockedType), bind_SetAttribute("src", value), !0 // Impedindo execução script blacklisted : Alterando o type do script criado para o tipo bloqueado
           );
         },
       },
       type: {
         set: function(value) {
           var match = validarSrcScript(
              bind_mp_document_createElement['src'],
              bind_mp_document_createElement['type']
          );

             var e = match
             ? jsBlockedType
             : value;
           return bind_SetAttribute("type", e), !0; // Impedindo execução script : Alterando o type do script blacklisted criado para o tipo bloqueado
         },
       },
     }),
       (bind_mp_document_createElement.setAttribute = function(t, e) {
         "type" === t || "src" === t
           ? (bind_mp_document_createElement[t] = e as any)
           : HTMLScriptElement.prototype.setAttribute.call(
               bind_mp_document_createElement,
               t,
               e
             );
       });
   } catch (t) {
     console.warn(
       "SPtt: unable to prevent script execution for script src ",
       bind_mp_document_createElement['src'],
       ".\n",
       'A likely cause would be because you are using a third-party browser extension that monkey patches the "document.createElement" function.'
     );
   }
   return bind_mp_document_createElement;
 };
 var d = new RegExp("[|\\{}()[\\]^$+*?.]", "g");
 export const unblock = function() {
   for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++)
     n[e] = arguments[e];
   n.length < 1
     ? ((accepted_list.blacklist = []), (accepted_list.whitelist = []))
     : (accepted_list.blacklist &&
         (accepted_list.blacklist = accepted_list.blacklist.filter(function(
           e: { test: (arg0: string) => any; toString: () => string; }
         ) {
           return n.every(function(t) {
             return "string" == typeof t
               ? !e.test(t)
               : t instanceof RegExp
               ? e.toString() !== t.toString()
               : void 0;
           });
         })),
       accepted_list.whitelist &&
         (accepted_list.whitelist = [].concat(
           getArray(accepted_list.whitelist) as never,
           getArray(
             n
               .map(function(e) {
                 if ("string" == typeof e) {
                   var n = ".*" + e.replace(d, "\\$&") + ".*";
                   if (
                     accepted_list.whitelist.every(function(t: { toString: () => string; }) {
                       return t.toString() !== n.toString();
                     })
                   )
                     return new RegExp(n);
                 } else if (
                   e instanceof RegExp &&
                   accepted_list.whitelist.every(function(t: { toString: () => string; }) {
                     return t.toString() !== e.toString();
                   })
                 )
                   return e;
                 return null;
               })
               .filter(Boolean)
           )as never
         ) ));
   for (
     var blockedScripts = document.querySelectorAll(
         'script[type="'.concat(jsBlockedType, '"]')
       ),
       i = 0;
     i < blockedScripts.length;
     i++
   ) {
     var b_script = blockedScripts[i];
     validarScrElemento(b_script) &&
       ((b_script['type'] = "application/javascript"),
       unnacepted_list.blacklisted.push(b_script as never),
       b_script?.parentElement?.removeChild(b_script));
   }
   var c = 0;
   getArray(unnacepted_list.blacklisted).forEach(function(t, e) {
     if (validarScrElemento(t)) {
       var n = document.createElement("script");
       n.setAttribute("src", t.src),
         n.setAttribute("type", "application/javascript"),
         document.head.appendChild(n),
         unnacepted_list.blacklisted.splice(e - c, 1),
         c++;
     }
   })
   ,
   accepted_list.blacklist &&
   accepted_list.blacklist.length < 1 &&
   p.disconnect();
 }
 

} 
