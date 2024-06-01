import "vuetify/styles";

import {
  createVuetify,
  // ThemeDefinition
} from "vuetify";
import { md2 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import { light2, dark } from "@/assets/themes";

// import { srLatn } from "vuetify/locale";

import {
  IconAddToCart as IconKantarKorpa2,
  IconBrasno,
  IconGlobeKantar,
  IconKorpaKantar,
  IconKuhinja,
  IconLogoKantar,
  IconLogoKantarH,
  IconMed,
  IconMeso,
  IconMlecno,
  IconPice,
  IconRiba,
  IconSokovi,
  IconSrbija,
  IconUlje,
  IconVocePovrce,
  IconZacin,
  IconZimnica,
} from "@/components/icons/kantar-rs";

import {
  IconReddit,
  IconPinterest,
  IconCompleted,
  IconBrandTag,
  IconAccountConfigure,
  IconWrench,
  IconEyeOff,
  IconEye,
  IconRescue,
  IconBoxReady,
  IconChecklistOk,
  IconCalendarEventOutline,
  IconTruckTransit,
  IconPackageReady,
  IconCircleFilled,
  IconReceitSendOutline,
  IconPrint,
  IconInvoice,
  IconBasketFull,
  IconFileDownloadFilled,
  IconMedal,
  IconStartOutline,
  IconLinkedin,
  IconKeyTwoFilled,
  IconTwitterX,
  IconFacebookColor,
  IconGoogleColor,
  IconFarmhouse,
  IconStar,
  IconYotubeVideo,
  IconPdf,
  IconStarFat,
  IconShine,
  IconRoadSign,
  IconPlant,
  IconProductSearch,
  IconSearchSettings,
  IconMegaphone,
  IconStarCircle,
  IconThumbsUpOutline,
  IconThumbsDownOutline,
  IconChecklist,
  IconDeliveryTruckFilledSpeed,
  IconAdjustSettings,
  IconAntenaLight,
  IconAttach,
  IconBatteryHalf,
  IconBookOpen,
  IconBox,
  IconBoxes,
  IconCartOff,
  IconCategory,
  IconChatBubbleOutline,
  IconChatBubbles,
  IconChatDotsOutlined,
  IconCheck,
  IconCheckbox,
  IconCheckboxBlank,
  IconClipboardOutline,
  IconCloudUp,
  IconDashboardFilled,
  IconDeliveryTruck,
  IconDial,
  IconDotsVertical,
  IconDowntown,
  IconEditNoteOutlined,
  IconEmailAt,
  IconEnvelopeOpenHandDrawn,
  IconEnvelopeOutlined,
  IconEraserFilled,
  IconExternalLinkOutline,
  IconFacebook,
  IconFactoryFill,
  IconFeather,
  IconFolder,
  IconFolderFilled,
  IconGithubOutlined,
  IconGlobe,
  IconHeadphone,
  IconHelpCircleOutline,
  IconHelpSquareFilled,
  IconHomeFilled,
  IconIdCardCompanyOutlined,
  IconImageAdd,
  IconImageOutlined,
  IconImages,
  IconInformation,
  IconInstagram,
  IconJournalOutline,
  IconKey,
  IconLink,
  IconLocationFilled,
  IconLockOpenOutline,
  IconMagnifyingGlasLight,
  IconMenu,
  IconOwnerFilled,
  IconPage,
  IconPalleteFull,
  IconPaperPlaeOutline,
  IconPeopleFilled,
  IconPersonAddOutline,
  IconPersonFilled,
  IconPersonRemoveOutline,
  IconPlusCircle,
  IconPostOutline,
  IconPowerOff,
  IconProductAdd,
  IconProductEdit,
  IconRedEye,
  IconRSDinar,
  IconSaveFilled,
  IconSettingsFill,
  IconShareFilled,
  IconShareOffFilled,
  IconShoppingCartOutline,
  IconStore,
  IconStoreFrontOutlined,
  IconTag,
  IconTagOutlined,
  IconTaskAddOutline,
  IconTaskEditOutlined,
  IconTaskShareOutlined,
  IconTextDescription,
  IconTodoOutline,
  IconTrashFill,
  IconUserCircle,
  IconUserShield,
} from "@/components/icons";

// # --default-light-theme
// const demoLightTheme: ThemeDefinition = {
//   dark: false,
//   colors: {
//     background: '#FFFFFF',
//     surface: '#FFFFFF',
//     primary: '#6200EE',
//     secondary: '#03DAC6',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   }
// };

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    blueprint: md2,

    // @useDisplay composable configuration options
    // https://next.vuetifyjs.com/en/features/display-and-platform/#interface
    // display: {
    //   mobileBreakpoint: "sm",
    //   thresholds: {
    //     xs: 0,
    //     sm: 340,
    //     md: 540,
    //     lg: 800,
    //     xl: 1280,
    //   },
    // },

    // https://next.vuetifyjs.com/en/features/theme/
    // https://next.vuetifyjs.com/en/features/theme/#theme-object-structure
    theme: {
      // defaultTheme: "dark",
      // defaultTheme: "light2",
      themes: {
        light2,
        dark,
      },
      variations: {
        colors: [
          "primary",
          "secondary",
          "success",
          "info",
          "warning",
          "error",
          "accent1",
          "accent2",
          "complement",
          "primary2",
          "primary3",
        ],
        lighten: 5,
        darken: 5,
      },
    },

    // aliases: {
    //   MyButton: VBtn,
    //   MyButtonAlt: VBtn,
    // },

    // @@ set component/alias props
    defaults: {
      global: {
        // ripple: true,
      },
      // VSheet: {
      //   elevation: 2,
      // },
      VBtn: {
        color: "secondary",
        variant: "flat",
      },
      // VTextField: {
      //   "center-affix": true,
      // },

      // MyButton: {
      //   color: 'primary',
      //   variant: 'tonal',
      // },
      // VCard: {
      //   MyButton: { color: 'secondary' },
      //   VBtn: { color: 'primary' },
      // },
      // <CustomComponent>: {
      //   "foo:1": "bar",
      // },

      VCol: {
        cols: 12,
      },
    },

    icons: {
      defaultSet: "mdi",
      aliases: {
        ...aliases,
        // # override
        menu: IconMenu,
        // # add: <VIcon icon="$other">
        // # @icons:kantar.rs
        iconReddit: IconReddit,
        iconFacebookColor: IconFacebookColor,
        iconBrasno: IconBrasno,
        iconGlobeKantar: IconGlobeKantar,
        iconKantarKorpa2: IconKantarKorpa2,
        iconKorpaKantar: IconKorpaKantar,
        iconKuhinja: IconKuhinja,
        iconLogoKantar: IconLogoKantar,
        iconLogoKantarH: IconLogoKantarH,
        iconMed: IconMed,
        iconMeso: IconMeso,
        iconMlecno: IconMlecno,
        iconPice: IconPice,
        iconRiba: IconRiba,
        iconSokovi: IconSokovi,
        iconSrbija: IconSrbija,
        iconUlje: IconUlje,
        iconVocePovrce: IconVocePovrce,
        iconZacin: IconZacin,
        iconZimnica: IconZimnica,
        //
        iconPinterest: IconPinterest,
        iconCompleted: IconCompleted,
        iconBrandTag: IconBrandTag,
        iconAccountConfigure: IconAccountConfigure,
        iconWrench: IconWrench,
        iconEyeOff: IconEyeOff,
        iconEye: IconEye,
        iconRescue: IconRescue,
        iconBoxReady: IconBoxReady,
        iconChecklistOk: IconChecklistOk,
        iconCalendar: IconCalendarEventOutline,
        iconTruckTransit: IconTruckTransit,
        iconPackageReady: IconPackageReady,
        iconCircle: IconCircleFilled,
        iconReceitSend: IconReceitSendOutline,
        iconPrint: IconPrint,
        iconInvoice: IconInvoice,
        iconBasketFull: IconBasketFull,
        iconFileDownload: IconFileDownloadFilled,
        iconMedal: IconMedal,
        iconStartOutline: IconStartOutline,
        iconLinkedin: IconLinkedin,
        iconKeyTwo: IconKeyTwoFilled,
        iconTwitterX: IconTwitterX,
        iconGoogleColor: IconGoogleColor,
        iconFarmhouse: IconFarmhouse,
        iconStar: IconStar,
        iconYotubeVideo: IconYotubeVideo,
        iconPdf: IconPdf,
        iconStarFat: IconStarFat,
        iconShine: IconShine,
        iconRoadSign: IconRoadSign,
        iconPlant: IconPlant,
        iIconProductSearch: IconProductSearch,
        iconSearchSettings: IconSearchSettings,
        iconMegaphone: IconMegaphone,
        iconStarCircle: IconStarCircle,
        iconThumbsUpOutline: IconThumbsUpOutline,
        iconThumbsDownOutline: IconThumbsDownOutline,
        iconChecklist: IconChecklist,
        iconDeliveryTruckSpeed: IconDeliveryTruckFilledSpeed,
        iconAdjustSettings: IconAdjustSettings,
        iconAntena: IconAntenaLight,
        iconAttach: IconAttach,
        iconBattery: IconBatteryHalf,
        iconBook: IconBookOpen,
        iconBox: IconBox,
        iconBoxes: IconBoxes,
        iconCartOff: IconCartOff,
        iconCategory: IconCategory,
        iconChat: IconChatBubbleOutline,
        iconChatBubbles: IconChatBubbles,
        iconChatDots: IconChatDotsOutlined,
        iconCheck: IconCheck,
        iconCheckboxOff: IconCheckboxBlank,
        iconCheckboxOn: IconCheckbox,
        iconClipboard: IconClipboardOutline,
        iconCloudUp: IconCloudUp,
        iconDashboard: IconDashboardFilled,
        iconDeliveryTruck: IconDeliveryTruck,
        iconDescription: IconTextDescription,
        iconDial: IconDial,
        iconDotsV: IconDotsVertical,
        iconDowntown: IconDowntown,
        iconEditNote: IconEditNoteOutlined,
        iconEmailAt: IconEmailAt,
        iconEnvelope: IconEnvelopeOutlined,
        iconEnvelopeOpenHandDrawn: IconEnvelopeOpenHandDrawn,
        iconEraser: IconEraserFilled,
        iconExternalLink: IconExternalLinkOutline,
        iconFacebook: IconFacebook,
        iconFactory: IconFactoryFill,
        iconFeather: IconFeather,
        iconFolder: IconFolder,
        IconFolderFilled: IconFolderFilled,
        iconFolderFilled: IconFolderFilled,
        iconGithub: IconGithubOutlined,
        iconGlobe: IconGlobe,
        iconHelp: IconHelpSquareFilled,
        iconHelpCircle: IconHelpCircleOutline,
        iconHome: IconHomeFilled,
        iconIdCardCompany: IconIdCardCompanyOutlined,
        iconImage: IconImageOutlined,
        iconImageAdd: IconImageAdd,
        iconImages: IconImages,
        iconInfo: IconInformation,
        iconInstagram: IconInstagram,
        iconJournal: IconJournalOutline,
        iconKey: IconKey,
        iconLink: IconLink,
        iconLocation: IconLocationFilled,
        iconLock: IconLockOpenOutline,
        iconMagnifyingGlass: IconMagnifyingGlasLight,
        iconOwner: IconOwnerFilled,
        iconPage: IconPage,
        iconPalleteFull: IconPalleteFull,
        iconPaperPlane: IconPaperPlaeOutline,
        iconPeople: IconPeopleFilled,
        iconPerson: IconPersonFilled,
        iconPersonAdd: IconPersonAddOutline,
        iconPersonRemove: IconPersonRemoveOutline,
        iconPhone: IconHeadphone,
        iconPlusCircle: IconPlusCircle,
        iconPost: IconPostOutline,
        iconPowerOff: IconPowerOff,
        iconProductAdd: IconProductAdd,
        iconProductEdit: IconProductEdit,
        iconRedEye: IconRedEye,
        iconRSD: IconRSDinar,
        iconSave: IconSaveFilled,
        iconSettings: IconSettingsFill,
        iconShare: IconShareFilled,
        iconShareOff: IconShareOffFilled,
        iconShoppingCart: IconShoppingCartOutline,
        iconStore: IconStore,
        iconStoreFront: IconStoreFrontOutlined,
        iconTag: IconTag,
        iconTagOutlined: IconTagOutlined,
        iconTaskEdit: IconTaskEditOutlined,
        iconTasksAdd: IconTaskAddOutline,
        iconTaskShare: IconTaskShareOutlined,
        iconTodo: IconTodoOutline,
        iconTrash: IconTrashFill,
        iconUserCircle: IconUserCircle,
        iconUserShield: IconUserShield,
      },
      sets: {
        mdi,
      },
    },
    // locale: {
    //   locale: "srLatn",
    //   messages: { srLatn },
    //   // fallback: "en",
    //   // locale: 'zhHans',
    //   // messages: { zhHans, pl, sv }
    // },
  });
  // @@
  nuxtApp.vueApp.use(vuetify);
});

// interface IconAliases {
//   [name: string]: IconValue;
//   calendar: IconValue;
//   cancel: IconValue;
//   checkboxIndeterminate: IconValue;
//   checkboxOff: IconValue;
//   checkboxOn: IconValue;
//   clear: IconValue;
//   close: IconValue;
//   complete: IconValue;
//   delete: IconValue;
//   delimiter: IconValue;
//   dropdown: IconValue;
//   edit: IconValue;
//   error: IconValue;
//   expand: IconValue;
//   file: IconValue;
//   first: IconValue;
//   info: IconValue;
//   last: IconValue;
//   loading: IconValue;
//   menu: IconValue;
//   minus: IconValue;
//   next: IconValue;
//   plus: IconValue;
//   prev: IconValue;
//   radioOff: IconValue;
//   radioOn: IconValue;
//   ratingEmpty: IconValue;
//   ratingFull: IconValue;
//   ratingHalf: IconValue;
//   sortAsc: IconValue;
//   sortDesc: IconValue;
//   subgroup: IconValue;
//   success: IconValue;
//   unfold: IconValue;
//   warning: IconValue;
// }
