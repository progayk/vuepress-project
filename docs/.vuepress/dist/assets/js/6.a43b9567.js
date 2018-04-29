(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{81:function(t,s,e){"use strict";e.r(s);var a=e(0),o=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content"},[e("h1",{attrs:{id:"git-docs"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-docs","aria-hidden":"true"}},[t._v("#")]),t._v(" Git Docs")]),e("h2",{attrs:{id:"remove-a-file-folder-cache-from-git"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#remove-a-file-folder-cache-from-git","aria-hidden":"true"}},[t._v("#")]),t._v(" Remove a file/folder cache from git")]),e("p",[t._v("For single file:")]),e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" "),e("span",{attrs:{class:"token function"}},[t._v("rm")]),t._v(" --cached mylogfile.log\n")])]),e("p",[t._v("For single directory:")]),e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" "),e("span",{attrs:{class:"token function"}},[t._v("rm")]),t._v(" --cached -r mydirectory\n")])]),e("h2",{attrs:{id:"remove-a-single-file-from-specific-commit"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#remove-a-single-file-from-specific-commit","aria-hidden":"true"}},[t._v("#")]),t._v(" Remove a single file from specific commit")]),e("p",[t._v("In order to delete a specific file from any previuos commit you should follow these steps:")]),e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout "),e("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("commit_id"),e("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),e("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --soft HEAD^\n"),e("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" "),e("span",{attrs:{class:"token function"}},[t._v("rm")]),t._v(" --cached "),e("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("file-name"),e("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),e("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),e("span",{attrs:{class:"token string"}},[t._v('"<your_message>"')]),t._v("\n"),e("span",{attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout master\n")])]),e("div",{staticClass:"danger custom-block"},[e("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),e("p",[t._v("This is only for local git repo, if you want to delete from remote repo also, you should\ndeal with conflictions. For now, I don't know how to do it.")])])])}],!1,null,null,null);s.default=o.exports}}]);