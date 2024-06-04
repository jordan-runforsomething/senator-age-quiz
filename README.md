This app is a quiz where users - given a billboard top hit - guess which senator was born while the song was #1.

This app is a learning project. My goal was primarily to explore NextJS and AI image generation. To that end, this is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Resources Used to Create this App
- [DreamStudio](https://beta.dreamstudio.ai/generate) from stability.ai was used to generate the satirical images of each senator in some happy musical context.
- [NextUI](https://nextui.org/) - which depends on [Tailwindcss](https://tailwindcss.com/) - was used as a UI library so I could focus on writing Typescript instead of CSS :p
- Spotify (specifically [Spotify Web Embed](https://developer.spotify.com/documentation/embeds/references/iframe-api)) is used to play the songs. If the user is logged in to Spotify in their browser, they can listen to each song in full and add to their Spotify library. If not, Spotify plays a 30 second preview of the song.
- I use SASS because writing vanilla CSS takes too long. The standard [NextJS SASS config](https://nextjs.org/docs/app/building-your-application/styling/sass) applies


## Getting Started

First, install npm packages with `npm install`.

Run the development server with `npm run dev`.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the quiz welcome page.

## Configuration

The quiz is configured in:
- `resources/data.csv` includes our list of senators, their songs including Spotify URL, title, and artist, and details on the number and format of images for each senator. The image details are used to randomly choose an image for each senator at compile or run time. Images all live in `public/images` and are named predictably using the `image_slug` in our data file.
  - Note that `data.csv` is derived from [this Google Sheet](https://docs.google.com/spreadsheets/d/11aPq-vg4xlJlrkXkXkeFak2VWb_htmjNqGdSLzj3HYw/edit?usp=sharing). If forking this app, feel free to fork this Sheet, too.