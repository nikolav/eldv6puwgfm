import type { TStoreMain, TStoreFlags, IConfigDocs, IAppData } from "@/types";
import {
  assign,
  reMatchViewUser,
  reMatchViewProduct,
  reMatchViewStory,
} from "@/utils";
import { PRODUCTION$, URL_APP_PUBLIC } from "@/config";

const themeDark = "dark";
const themeLight = "light2";
const AUTH_LOCKED = "eq1hiOTCPNCfo20Y";
const CHAT_EDIT_active = "rAkrT0XZJvlXbb";
const TASK_EDIT_active = "TB2HXTaILV3eKlQAoSa8";
const PAGE_CACHED = "WrTD0QD08cjfqC4pol";
const PRODUCT_CATEGORY_prefix = "@product:category:";
const TAG_COMPANY_PROFILE_prefix = "@company:profile:fwgM8::";
const TAG_AUTH_PROFILE_prefix = TAG_COMPANY_PROFILE_prefix;

export default defineAppConfig({
  ADMIN_EMAIL: "admin@nikolav.rs",
  DEBUG: true !== PRODUCTION$,
  APP_USER_DEFAULT: {
    email: "korisnik@nikolav.rs",
    password: "korisnik@nikolav.rs",
  },
  app: {
    DEFAULT_TRANSITION: "slide-y-reverse-transition",
    CART_BADGE_OFFSET: 9,
    DEFAULT_NO_PRODUCT_IMAGE_FOUND: "/no-image-available.png",
    DEFAULT_NO_IMAGE: "/no-image.jpg",
  },
  com: {
    FIELDS: [
      "about",
      "address",
      "delivery",
      "district",
      "facebook",
      "instagram",
      "name",
      "ownerFirstName",
      "ownerLastName",
      "phone",
      "pin",
      "slug",
    ],
  },
  products: {
    PRODUCT_CATEGORY_prefix,
    perPage: 10,
    fields: [
      "name",
      "category",
      "price",
      "stockType",
      "stock",
      "onSale",
      "description",
    ],
    categories: [
      {
        title: "Bašta, voće, povrće, gljive",
        value: `${PRODUCT_CATEGORY_prefix}basta`,
      },
      {
        title: "Meso, jaja, mesne prerađevine",
        value: `${PRODUCT_CATEGORY_prefix}meso`,
      },
      {
        title: "Mleko i mlečni proizvodi",
        value: `${PRODUCT_CATEGORY_prefix}mleko`,
      },
      {
        title: "Začin, ulje, čaj, bilje",
        value: `${PRODUCT_CATEGORY_prefix}zacin-ulje`,
      },
      {
        title: "Brašno, žitarice, pekara",
        value: `${PRODUCT_CATEGORY_prefix}brasno`,
      },
      {
        title: "Med, proizvodi od meda",
        value: `${PRODUCT_CATEGORY_prefix}med`,
      },
      {
        title: "Zimnica, namazi, kompot",
        value: `${PRODUCT_CATEGORY_prefix}zimnica`,
      },
      {
        title: "Sokovi, sirup",
        value: `${PRODUCT_CATEGORY_prefix}sokovi`,
      },
      {
        title: "Alkoholna pića",
        value: `${PRODUCT_CATEGORY_prefix}pice`,
      },
      {
        title: "Zanat, rukotvorine",
        value: `${PRODUCT_CATEGORY_prefix}zanat`,
      },
    ],
    searchSortBy: [
      {
        title: "👌🏻 Najjeftinije",
        value: 1,
      },
      {
        title: "💰 Najskuplje",
        value: 2,
      },
      {
        title: "🌟 Najbolja ocena",
        value: 3,
      },
      {
        title: "🏆 Popularno",
        value: 8,
      },
      {
        title: "👍🏻 Pozitivno",
        value: 4,
      },
      {
        title: "✨ Novo",
        value: 5,
      },
      {
        title: "⌛ Staro",
        value: 6,
      },
      {
        title: "🔊 Najvise komentara",
        value: 7,
      },
    ],
  },
  docs: {
    LIKEDISLIKE_CACHE_ID: "4OpsEOLNYG1wuF64OhBr",
    CHAT_ORDER_COM_USER_prefix: "e5iT1p1Mmx5HD@",
    COM_PHOTOS_prefix: "@com:photos:",
    LIKES_preix: "@likes:",
    prefix_CHAT_ACTIVE: "KFrbiAW5Zm3:",
    prefix_TAG_USERS_DOCS: "pH82VKaHwf3RLfZlR:",
    PRODUCT_IMAGES: "@images:product:",
    TAG_COMPANY_PROFILE_prefix,
    TAG_AUTH_PROFILE_prefix,
    TAG_USERS: "@users",
    TASKS_ALL: "@tasks:all",
    TASKS_USER_prefix: "Njvrw1gYEXd3yv:",
  },
  //
  key: {
    MAP_DISTRICT_ACTIVE: "wYx1m0LMtLib1t7JgJ",
    PRODUCTS_SEARCH: "U4HCatxcgs",
    APP_MOUNTED: "Zkcmk4BnXHU",
    APP_PROCESSING: "FlaelfhZddK",
    AUTH_CREDS: "pafer98hf",
    AUTH_LOCKED,
    CARD_PRODUCT_DISPLAYED_HOVERED_ID: "wPV360PastGjrwS9hr",
    CHAT_CLIENTID_ACTIVE: "O5zl57Fui",
    CHAT_MAIN: "cLgtZdZLXHNdstzt",
    CHAT_NAME: "QOPnfTw9",
    CHAT_ORDER_MESSAGE: "SInuQBaRiY",
    COM_LIKES_prefix: "Y9tqzJgln0B::",
    COM_RATING_prefix: "rating:com:SiOobaXI2QXJgHs::",
    DISLIKES_STORE: "HwJ0dv9",
    FLAG_CART_OPEN: "S46jud",
    FORM_COMPANY_ID: "2wIETsis",
    FORM_DATA_FIELDS_prefix: "nIDobn5D::",
    INBOX_TAB_ACTIVE: "nuH82mKP7ZbUxtiEQ",
    INJECT_AUTHAPI: "WYvEK29UZIP",
    INJECT_THEME: "Aasnvy2eaxE",
    LIKES_STORE: "hqYqZ31rN4xwfb2qc",
    ORDER_ACTIVE: "order:active:S52BW2",
    ORDER_ID: "cxIH1hlzHzGUe6",
    ORDER_SEND_STATUS: "Ty6qF",
    POST_IMAGES_prefix: "CkJmp2R984QY@", // `${POST_IMAGES_prefix}${postId}:${imgId}`
    PRODUCT_ADD: "HAvQCqapN1NuJFIoS",
    PRODUCT_EDIT: "fRbSc",
    PRODUCT_RATING_prefix: "rating:products:FHj8C6t30equ4D::",
    PRODUCT_SELECTED: "Be3Q6GMsqZPSP",
    PRODUCTS_CHANGE: "O36Bjz6COY6i",
    PRODUCTS_LIKES_prefix: "MEDs6Eov9fHBM5HZ6I1X::",
    PROVIDE_APP_DATA: "Ud8dHoadmBgSr55P6gJ",
    RATING_LOCAL: "hGPTySh8oXXwmRgAV16q",
    SLUG_com: "gazdinstvo",
    SLUG_product: "proizvod",
    TASKS_SELECTED_IDS: "f6sSDP",
    THEME: "0Fgky53B2UbA1fG3lKcV",
    TOPIC_CHAT_ACTIVE: "8H7ykahv",
    TOPIC_CHAT_COM_prefix: "chat:com:EMs0Q::",
    TOPIC_CHAT_PRODUCTS_prefix: "chat:products:vyuoiOe3eZW7::",
    TOPIC_RATINGS: "ratings:N1cdcqMM",
  },
  //
  FIELDS_OMIT_STORAGE_META: ["id", "created_at", "updated_at", "__typename"],
  //
  DEFAULT_CONFIG_useApiDocs: <IConfigDocs>{ autoReload: true },
  defaults: {
    appData: <IAppData>{
      "admin:email": "admin@nikolav.rs",
    },
  },
  //
  api: {
    TAG_STORAGE: "@storage:",
    DOCS_CHAT_ALL: "@chat:all",
  },
  //
  graphql: {
    // ~10min autoreload*
    STORAGE_QUERY_POLL_INTERVAL: 712345,
  },
  //
  stores: {
    gravatars: {
      BASE_URL: "https://www.gravatar.com/avatar",
      GRAVATARS_CACHE: "gravatars:DKueKjfBLJlRj7k",
      MODE: {
        monsterid: true,
        wavatar: true,
        robohash: true,
      },
      SIZE: 92,
    },
    cart: {
      initial: {
        // `pid:amount` map to store
        items: <Record<number, number>>{},
        // additional order information
        data: <Record<string, any>>{},
      },
    },
    main: {
      initial: <TStoreMain>{
        "app:name": "nikolav.rs",
        [CHAT_EDIT_active]: null,
        [TASK_EDIT_active]: null,
        [PAGE_CACHED]: "",
      },
      CHAT_ACTIVE: "ozbbRlAv19DO",
      CHAT_ACTIVE_title: "SFImifljHov",
      CHAT_EDIT_active,
      TASK_EDIT_active,
      PAGE_CACHED,
    },
    flags: {
      initial: <TStoreFlags>{
        [AUTH_LOCKED]: false,
      },
    },
    auth: {
      KEY_ACCESS_TOKEN: ":sEe5xYuTL4q",
      KEY_USEFETCH_AUTHDATA: "GEXjh1kt9Oc",
      authDataFields: ["id", "email"],
      initial: () => "",
      authHeaders: (token: string, additional?: Record<string, any>) =>
        assign(
          token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
          additional || {}
        ),
    },
  },
  //
  io: {
    IOEVENT_AUTH_NEWUSER: "@auth:newuser",
    IOEVENT_COM_PHOTOS_CHANGE_prefix: "change:com-photos:",
    IOEVENT_DOC_CHANGE_prefix: "change://doc@",
    IOEVENT_DOCS_CHANGE_JsonData: "change:docs:JsonData:",
    IOEVENT_DOCS_CHANGE: "change:docs",
    IOEVENT_DOCS_TAGS_CHANGE_prefix: "change:docs:tags:",
    IOEVENT_FILES: "@files:updated",
    IOEVENT_ORDERS_CHANGE: "@orders:change:",
    IOEVENT_POST_CHANGE_SINGLE_prefix: "@change:post:4alBPKP:",
    IOEVENT_POSTS_CHANGE: "@change:posts:GCe5RKIXQWDh",
    IOEVENT_PRODUCT_IMAGES_CHANGE_prefix: "change:product-images:",
    IOEVENT_PRODUCTS_CHANGE_prefix: "change:products::",
    IOEVENT_PRODUCTS_CHANGE_SINGLE_prefix: "change:products:DkL11YfpPI:",
    IOEVENT_PRODUCTS_CHANGE: "@change:products:all",
    IOEVENT_STORAGE_CHANGE: "@storage:",
    IOEVENT_USER_POSTS_CHANGE_prefix: "@change:posts:rBN5PAj9uZM9wrOq5:",
    IOEVENT_STORY_PHOTOS_CHANGE_prefix: "@change:story:images:VDMf82FNKpfl6m:",
  },
  theme: {
    DEFAULT: themeLight,
    DARK: themeDark,
    LIGHT: themeLight,
  },
  layout: {
    appBarHeight: 52,
    userProfileDrawerWidth: 52,
    // additional @VMain/padding-top
    offsetTop: "1.22rem",
    //
    CAROUSEL_NAV_OFFSET_product_page: 42,
    TOPIC_CHAT_DISPLAY_CARD_WIDTH: 381,
  },
  effect: {
    default: "headShake",
    duration: 890,
  },
  urls: {
    appPublic: URL_APP_PUBLIC,
    github: "https://github.com/nikolav/nuxtflask",
    comPages: "/gazdinstvo/",
    productPages: "/proizvodi/",
    storyPages: "/prica/",
    QUERY: "q",
  },
  storage: {
    MENU_CATEGORY: "7n0FS9ZxoVN",
  },
  links: {
    external: {
      RPU: "https://www.apr.gov.rs/registri/ugovori-o-finansiranju-poljoprivredne-proizvodnje/o-registru.2367.html#:~:text=broj%20pod%20kojim%20je%20ugovor%20o%20finansiranju%20poljoprivredne%20proizvodnje%20zaveden%20Registru%20ugovora%20o%20finansiranju%20poljoprivredne%20proizvodnje",
      GOOGLE_CALENDAR_EDIT_PAGE:
        "https://calendar.google.com/calendar/u/0?cid=dnVrb3ZpY25pa29sYTIwMTRAZ21haWwuY29t",
      SRC_GOOGLE_CALENDAR_IFRAME:
        "https://calendar.google.com/calendar/embed?height=480&wkst=2&ctz=Europe%2FBelgrade&bgcolor=%23ffffff&showTitle=0&showTabs=0&showCalendars=0&hl=sr&src=ZW4ucnMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uaXNsYW1pYyNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000&color=%237CB342",
    },
  },
  re: {
    // routes with provided 'default user' login fallback
    viewRoutes: [reMatchViewUser, reMatchViewProduct, reMatchViewStory],
  },
  SEO: {
    title: "kantar.rs",
    ogTitle: "kantar.rs, online pijaca",
    description:
      "KANTAR.RS Vam omogućava lakše povezivanje sa kupcima u zemlji, kao i jednostavnu pretragu i naručivanje proizvoda, dobara i narodnih rukotvorina domaćeg porekla.",
    ogDescription:
      "KANTAR.RS Vam omogućava lakše povezivanje sa kupcima u zemlji, kao i jednostavnu pretragu i naručivanje proizvoda, dobara i narodnih rukotvorina domaćeg porekla. Ova onlajn pijaca povezuje srpske proizvođače i zanatlije sa potrošačima koji traže kvalitetne, zdravije i sveže proizvode iz cele Srbije. Naša platforma se bavi povezivanjem kupca i prodavca. Kupac se dogovara sa prodavcem oko vremena i načina isporuke. Kupovinu iz fotelje i dostavu svih proizvoda naručenih na teritoriji grada Beograda na kućnu adresu od sada je dostupno putem naše platforme KANTAR.RS.",
    ogImage: "https://nikolav.rs/kantar-rs-logo.png",
  },
  story: {
    STORY_MIN_CONTENT_LENGTH: 10,
  },
});
