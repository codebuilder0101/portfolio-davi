export type Tech = { name: string; icon: string };

const t = (name: string, icon: string): Tech => ({ name, icon: `/stack/${icon}.svg` });

export const stack = {
  mobile: [
    t("Flutter", "flutter"),
    t("Dart", "dart"),
    t("Swift", "swift"),
    t("Kotlin", "kotlin"),
    t("React Native", "react"),
    t("iOS", "apple"),
    t("Android", "android"),
    t("Jetpack Compose", "jetpackcompose"),
    t("Xcode", "xcode"),
    t("Android Studio", "androidstudio"),
    t("Objective-C", "objectivec"),
    t("Java", "java"),
    t("Expo", "si-expo"),
  ],
  ai: [
    t("Python", "python"),
    t("TensorFlow", "tensorflow"),
    t("PyTorch", "pytorch"),
    t("OpenCV", "opencv"),
    t("scikit-learn", "scikitlearn"),
    t("NumPy", "numpy"),
    t("Pandas", "pandas"),
    t("OpenAI", "si-openai"),
    t("Gemini", "si-googlegemini"),
    t("Claude", "si-anthropic"),
    t("Hugging Face", "si-huggingface"),
    t("LangChain", "si-langchain"),
  ],
  web: [
    t("Next.js", "nextjs"),
    t("React", "react"),
    t("TypeScript", "typescript"),
    t("JavaScript", "javascript"),
    t("Tailwind CSS", "tailwindcss"),
    t("Vue.js", "vuejs"),
    t("HTML5", "html5"),
    t("CSS3", "css3"),
  ],
  backend: [
    t("Django", "django"),
    t("FastAPI", "fastapi"),
    t("Node.js", "nodejs"),
    t("Laravel", "laravel"),
    t("GraphQL", "graphql"),
    t("PostgreSQL", "postgresql"),
    t("MongoDB", "mongodb"),
    t("Redis", "redis"),
    t("SQLite", "sqlite"),
    t("Firebase", "firebase"),
    t("Supabase", "supabase"),
  ],
  cloud: [
    t("AWS", "amazonwebservices"),
    t("Google Cloud", "googlecloud"),
    t("Docker", "docker"),
    t("GitHub Actions", "githubactions"),
    t("Git", "git"),
    t("Fastlane", "si-fastlane"),
  ],
  xr: [
    t("Unity", "unity"),
    t("Meta Quest", "si-meta"),
    t("Three.js", "threejs"),
    t("Blender", "blender"),
  ],
  commerce: [
    t("Shopify", "si-shopify"),
    t("Stripe", "si-stripe"),
    t("WooCommerce", "woocommerce"),
    t("WordPress", "wordpress"),
  ],
  quality: [
    t("Figma", "figma"),
    t("Jest", "jest"),
    t("Selenium", "selenium"),
    t("Redux", "redux"),
    t("App Store", "si-appstore"),
    t("Google Play", "si-googleplay"),
  ],
} as const;

export type StackCategory = keyof typeof stack;

/** Curated set for the marquee — the most representative daily drivers. */
export const marqueeTop: Tech[] = [
  stack.mobile[0], stack.mobile[2], stack.mobile[3], stack.mobile[4], stack.mobile[5], stack.mobile[6],
  stack.web[0], stack.web[2], stack.backend[0], stack.backend[9], stack.ai[0], stack.ai[1], stack.ai[7],
];
export const marqueeBottom: Tech[] = [
  stack.mobile[1], stack.mobile[7], stack.ai[2], stack.ai[3], stack.ai[8], stack.ai[10], stack.backend[5],
  stack.backend[2], stack.cloud[0], stack.cloud[2], stack.xr[0], stack.xr[1], stack.quality[0], stack.commerce[0],
];
