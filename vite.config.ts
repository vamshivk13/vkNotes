import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	manifest: {
		name: "VkNotesAPP",
		short_name: "NotesAPP",
		description: "An app that can show weather forecast for your city.",
		icons: [
			{
				src: "/logo192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/logo512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/logo384.png",
				sizes: "384x384",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/maskable_icon.png",
				sizes: "450x450",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};
// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [react(), VitePWA(manifestForPlugin)],
});