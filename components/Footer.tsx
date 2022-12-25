import Image from 'next/image';

export default function Footer() {
  return (
    <div className="flex justify-center items-center py-6 px-20 w-full text-white">
      <div className="flex flex-col text-center items-center">
        <p>
          This is an open source project, if you would like to get involved, <br /> please check the repo on{' '}
          <a className="underline" href="https://github.com/octaviandd/spotify-nextjs">
            Github
          </a>
          .
        </p>
        <div className="flex">
          <a className="flex items-center" href="https://www.buymeacoffee.com/octaviandd">
            <span className="mr-3 mt-2">Buy me a coffee</span>
            <Image src="/coffee.svg" width={28} height={28} />
          </a>
        </div>
      </div>
    </div>
  );
}
