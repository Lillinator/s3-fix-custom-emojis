import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "fix-custom-emoji-s3-urls",
  
  initialize() {
    withPluginApi("0.8.18", (api) => {
      const rawSetting = settings.raw_s3_bucket_url;
      const cdnSetting = settings.s3_cdn_url;

      if (!rawSetting || !cdnSetting) {
        return;
      }

      const cleanRawDomain = rawSetting.replace(/^https?:\/\//, '').replace(/^\/\//, '');
      const cleanCdnDomain = cdnSetting.replace(/^https?:\/\//, '').replace(/^\/\//, '');

      const fixEmojiUrls = (element) => {
        const customEmojis = element.querySelectorAll("img.emoji.emoji-custom");
        
        customEmojis.forEach((img) => {
          if (img.src && img.src.includes(cleanRawDomain)) {
            img.src = img.src.replace(cleanRawDomain, cleanCdnDomain);
          }
        });
      };

      api.decorateCookedElement(fixEmojiUrls, { 
        id: "fix-post-custom-emojis",
        onlyStream: false 
      });

      if (api.decorateChatMessage) {
        api.decorateChatMessage(fixEmojiUrls, { 
          id: "fix-chat-custom-emojis" 
        });
      }
    });
  }
};
