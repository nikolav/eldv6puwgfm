export const TOOLBAR_DEFAULT = [
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ header: 1 }, { header: 2 }], // custom button values
  ["bold", "italic", "underline", "strike"],
  [
    "blockquote",
    // "code-block",
  ],
  [
    "link",
    // "image",
    // "video",
    // "formula",
  ],

  [
    { list: "ordered" },
    { list: "bullet" },
    // { list: "check" },
  ],
  // [{ script: "sub" }, { script: "super" }], // superscript/subscript
  // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // [{ direction: "rtl" }], // text direction

  // [
  //   {
  //     size: [
  //       "small",
  //       false,
  //       "large",
  //       // "huge",
  //     ],
  //   },
  // ], // custom dropdown

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

export const DEFAULT_OPTIONS = {
  modules: {
    toolbar: TOOLBAR_DEFAULT,
  },
  theme: "snow",
  placeholder: "Moja priča...",
  // bounds: "#quill--bounds",
};
