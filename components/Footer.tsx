import Image from "next/image";

export default function Footer() {
  return (
    <div className="border-t-2 flex justify-between items-center py-6 px-20 w-full bg-black text-white mt-5">
      <div className="flex flex-col">
        <a href="https://www.spotify.com">Spotify</a>
        <a href="https://developer.spotify.com/">Spotify Developer</a>
        <a href="https://developer.spotify.com/documentation/web-api/">Spotify API</a>
      </div>
      <div className="flex flex-col text-center">
        <p>
          This is an open source project, if you would like to get involved, <br /> please check the repo on{' '}
          <a className="underline" href="https://github.com/octaviandd/spotify-nextjs">
            Github
          </a>
          .
        </p>
      </div>
      <div className="flex flex-col">
        <div className="mr-3">
          <span className="mr-3">
            Made by{' '}
            <a className="underline" href="https://github.com/octaviandd">
              Octavian
            </a>{' '}
            <span className="text-[18px]">&#128513;</span>
          </span>
        </div>
        <div className="flex">
          <a className="flex items-center" href="https://www.buymeacoffee.com/octaviandd">
            <span className="mr-3">Buy me a coffee</span>
            <Image src="/coffee.svg" width={40} height={40} />
          </a>
        </div>
      </div>
    </div>
  );
}
