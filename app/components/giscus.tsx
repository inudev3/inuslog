"use client";
import { useEffect } from "react";

const giscusThemes = {
	light: "https://giscus.app/themes/noborder_light.css",
	dark: "https://giscus.app/themes/noborder_gray.css",
} as const;

export const changeGiscusTheme = (theme: keyof typeof giscusThemes) => {
	const sendMessage = (config: unknown) => {
		const iframe = document.querySelector<HTMLIFrameElement>(
			"iframe.giscus-frame",
		);

		iframe?.contentWindow?.postMessage(
			{ giscus: config },
			"https://giscus.app",
		);
	};

	sendMessage({
		setConfig: {
			theme: giscusThemes[theme],
		},
	});
};

export const GiscusSection = (props: React.HTMLAttributes<HTMLElement>) => {
	console.log("giscus!");
	useEffect(() => {
		const theme: keyof typeof giscusThemes =
			document.documentElement.classList.contains("dark") ? "dark" : "light";

		const giscusAttributes = {
			src: "https://giscus.app/client.js",
			"data-repo": "inudev3/inuslog",
			"data-repo-id": "R_kgDOLHb1eg",
			"data-category": "General",
			"data-category-id": "DIC_kwDOLHb1es4Ceq5q",
			"data-mapping": "pathname",
			"data-strict": "0",
			"data-reactions-enabled": "1",
			"data-emit-metadata": "0",
			"data-input-position": "bottom",
			"data-lang": "ko",
			"data-theme": giscusThemes["dark"],
			crossorigin: "anonymous",
			async: "",
		};

		const giscusScript = document.createElement("script");
		Object.entries(giscusAttributes).forEach(([key, value]) =>
			giscusScript.setAttribute(key, value),
		);
		document.querySelector("#giscus")?.appendChild(giscusScript);
	}, []);

	return (
		<section {...props} style={{ minHeight: "372px" }} id="giscus"></section>
	);
};
