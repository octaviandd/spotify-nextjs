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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              overflow="visible"
              width="38"
              height="38"
              viewBox="0 0 532.268 595.532"
              version="1.1"
              enableBackground="new 0 0 532.268 595.532"
            >
              <defs id="defs99">
                <linearGradient
                  id="linearGradient3185"
                  y2="227"
                  gradientUnits="userSpaceOnUse"
                  x2="283.92"
                  y1="226.3"
                  x1="127.27"
                >
                  <stop id="stop3181" stopColor="#803300" offset="0" />
                  <stop id="stop3183" stopColor="#803300" stopOpacity="0" offset="1" />
                </linearGradient>
              </defs>
              <path
                id="path5"
                d="m416.68 48.167c12.696-0.03 19.416 5.917 29 9 5.615 5.572 11.137 13.029 12 24 1.383 17.571-5.835 32.818-13 43-1.723 2.448-2.632 5.335-4 7-22.226 27.033-61.861 35.368-97 38 25.053-10.3 55.029-25.979 72-51 6.104-9 15.781-26.229 13-45-1.53-10.364-8.19-15.167-12-25.003z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path7"
                d="m321.68 99.167c-19.546 9.167-42.515 10.209-61 18-11.59 4.885-23.982 11.51-34 19-9.478 7.087-17.819 19.201-23 33-2.75 7.322-4.07 14.068-5 25-37.25 5.083-82.069 2.598-102 25-1.56 16.893 5.132 25.535 12 34 6.776 18.929 11.748 38.409 18 57 6.283 18.683 15.095 35.832 21 54-24.273 1.957-58.063 5.106-82 15-12.59 5.204-22.991 10.731-23 24-33.336-93.773 3.144-189.14 54-240 19.662-19.662 41.975-35.606 69-48 1.157-0.531 3.252-1.209 5-2 4.163-1.882 11.442-6.003 18-8 29.332-8.929 69.023-18.434 110-12 7.54 1.18 14.01 4.739 23 5.997zm-125 10.003c-22.019 6.889-40.098 16.055-57 27-6.624 4.29-13.149 10.037-18 14-1.999 1.633-5.068 2.357-7 4-6.481 5.511-12.105 12.913-18 19-6.367 6.574-14.121 12.828-16 22 41.778 2.778 73.242-4.758 109-8 3.684-20.649 12.757-35.909 23-50 14.798-11.552 30.972-23.984 50-31 4.734-1.746 12.27 0.039 13-8-31.24-1.437-56.06 3.82-79 11zm-123 91c-7.042 16.292-17.772 28.895-22 48 15.735-0.402 30.327 0.34 45 1-0.399-8.091-7.83-9.992-9-17-2.313-13.85 9.463-22.677 17-30-11.4 0.4-18.726-3.27-30.997-2zm-25 56c-3.54 10.794-7.075 21.591-8 35 22.74 0.259 46.754-0.754 68 1-2.151-12.849-3.554-26.446-9-36h-50.997zm-11 45c0.639 9.973-1.729 16.938-1 27 27.18-1.994 59.666-1.136 87 0-3.069-9.932-7.575-18.425-11-28-29.452 0.99-52.53-0.34-74.997 1zm-1 37c0.037 10.856 3.214 14.549 3 24 32.212-0.455 67.048 1.715 95-3-0.202-9.798-6.928-13.072-8-22-26.08 2.13-69.487-0.4-89.997 1zm7 42c6.152-1.514 15.121-0.212 17-6h-19c-0.792 3.45 1.111 4.22 2 6z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path9"
                d="m275.68 98.167c-0.73 8.039-8.266 6.254-13 8-19.028 7.016-35.202 19.448-50 31-10.243 14.091-19.316 29.351-23 50-35.758 3.242-67.222 10.778-109 8 1.879-9.172 9.633-15.426 16-22 5.895-6.087 11.519-13.489 18-19 1.932-1.643 5.001-2.367 7-4 4.851-3.963 11.376-9.71 18-14 16.902-10.945 34.981-20.111 57-27 22.94-7.18 47.76-12.437 79-11.003z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path11"
                d="m452.68 195.17c-53.594-0.586-100.7 1.05-152-1 15.548-7.199 35.729-5.521 56-8 19.98-2.443 38.953-6.58 55-13 5.339-2.136 10.229-5.619 16-7 4.741-1.135 11.654 8.914 15 13 4.56 5.56 8.35 10.25 10 16z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path13"
                d="m104.68 202.17c-7.537 7.323-19.313 16.15-17 30 1.17 7.008 8.601 8.909 9 17-14.673-0.66-29.265-1.402-45-1 4.228-19.105 14.958-31.708 22-48 12.274-1.27 19.6 2.4 31 2z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path15"
                d="m333.68 200.17h124c9.24 14.426 18.048 29.286 24 47-28.301 1.948-70.173 1-105 1-11.534 0-22.811 1.112-29-7 4.212-11.969 3.053-16.514 0-28-3.65-5.35-12.01-5.99-14-13z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path17"
                d="m111.68 220.17h3c5.558 12.959 23.05 18.7 38 19-0.684 3.492-6.612 2.144-10 2-4.341-0.185-10.255-1.204-14-2-2.44-0.519-6.546-1.343-8-2-4.327-1.955-7.787-7.878-10-13-0.12-1.8 1.23-2.11 1-4z"
                fillRule="evenodd"
              />
              <path
                id="path19"
                d="m119.68 238.17c41.47 18.647 113.69 14.555 165 12-21.717 7.417-56.625 6.904-90 7-11.391 0.033-24.049-2.007-37-4-16.67-2.57-35.4-1.69-38-15z"
                fillRule="evenodd"
              />
              <path
                id="path21"
                d="m484.68 255.17c2.71 11.957 7.43 21.904 8 36-36.568-0.6-80.344 1.24-112-1-0.935-14.398-6.523-24.144-13-33-0.184-0.851 0.39-0.943 1-1 0.81-0.19 0.997-1.003 2-1 22.27 0.1 78.39 2.34 114 0z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path23"
                d="m99.683 256.17c5.446 9.554 6.849 23.151 9 36-21.246-1.754-45.26-0.741-68-1 0.925-13.409 4.46-24.206 8-35h51.003z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path25"
                d="m135.68 256.17c4.646-0.979 6.037 1.296 9 2 8.552 1.329 19.429 1.158 30 3 4.06 0.708 9.925 1.672 12 5-17.094-1.239-36.103-0.564-51-4v-6z"
                fillRule="evenodd"
              />
              <path
                id="path27"
                d="m136.68 267.17c7.807 1.401 16.517 4.175 26 5 5.474 0.476 13.994-2.51 17 4-16.684-0.003-29.369 2.53-43-3v-6z"
                fillRule="evenodd"
              />
              <path
                id="path29"
                d="m282.68 378.17c8.766-28.901 22.823-52.51 31-82 15.255-3.412 12.638-24.696 35-21 4.299 4.391 6.913 7.359 6 17-1.788 18.885-17.591 33.674-31 45-0.993 0.839-1.014 3.076-2 4-0.716 0.67-3.873 1.064-5 2-3.985 3.309-12.09 7.769-17 12-7.61 6.56-10.32 17.82-17 23zm50-59c1.166-1.329 0.855-3.356 2-5 1.544-2.217 4.897-3.394 6-5 2.787-4.06 7.938-16.362 5-20-1.742 0.075-3.11-0.223-4-1-15.714 9.639-30.014 25.961-31 47 5.04-3.78 15.36-8.43 22-16z"
                fillRule="evenodd"
              />
              <path
                id="path31"
                d="m139.68 280.17c10.429 0.653 20.478 2.074 31 3 4.887 0.43 11.832-0.853 14 4-14.635-1.365-35.096 3.096-45-3v-4z"
                fillRule="evenodd"
              />
              <path
                id="path33"
                d="m310.68 335.17c0.986-21.039 15.286-37.361 31-47 0.89 0.777 2.258 1.075 4 1 2.938 3.638-2.213 15.94-5 20-1.103 1.606-4.456 2.783-6 5-1.145 1.644-0.834 3.671-2 5-6.64 7.57-16.96 12.22-22 16z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path35"
                d="m141.68 291.17c16.277 4.256 32.784 2.293 46 6-1.261 3.732-6.861 1.923-10 2-9.941 0.243-23.163-0.182-34 0-0.98-2.35-1.75-4.92-2-8z"
                fillRule="evenodd"
              />
              <path
                id="path37"
                d="m112.68 300.17c3.425 9.575 7.931 18.068 11 28-27.334-1.136-59.82-1.994-87 0-0.729-10.062 1.639-17.027 1-27 22.47-1.34 45.548-0.01 75-1z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path39"
                d="m495.68 300.17c-0.638 9.645 0.974 21.223 0 28-38.234-1.575-83.456-0.853-126-1 2.444-8.615 9.115-15.857 9-24 0.86-0.807 0.594-2.739 2-3h115z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path41"
                d="m145.68 304.17c16.124 2.097 29.046 1.429 43 5-0.761 3.694-6.203 1.908-9 2-9.283 0.303-21.915-0.227-32 0 0.11-3.11-3.14-2.86-2-7z"
                fillRule="evenodd"
              />
              <path
                id="path43"
                d="m149.68 316.17c13.364 2.524 23.89 1.916 37 4-2.208 4.647-10.686 2.968-17 3-6.772 0.034-13.478 0.265-18-1 1.07-3.74-2.48-2.85-2-6z"
                fillRule="evenodd"
              />
              <path
                id="path45"
                d="m154.68 327.17c7.629 2.101 15.118 2.202 24 3 3.145 0.282 8.449-0.021 10 3-2.537 3.691-9.675 1.972-15 2-5.886 0.031-12.045-0.024-17 0 0.27-3.6-1.84-4.82-2-8z"
                fillRule="evenodd"
              />
              <path
                id="path47"
                d="m126.68 337.17c1.072 8.928 7.798 12.202 8 22-27.952 4.715-62.788 2.545-95 3 0.214-9.451-2.963-13.144-3-24 20.513-1.4 63.92 1.13 90-1z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path49"
                d="m495.68 338.17c0.777 8.777-1.467 14.533-1 23-47.022 2.607-99.039-2.393-157 1 1.05-5.13 6.64-7.878 10-11 4.305-3.999 8.25-8.193 12-13 49.04-1.04 89.37 2.71 136 0z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path51"
                d="m159.68 340.17c0.851-0.184 0.943 0.39 1 1 4.446-0.556 9.616 1.585 15 2 7.072 0.545 15.87-2.514 19 3-8.907 2.004-23.2 3.132-33 1-0.16-2.84-1.83-4.17-2-7z"
                fillRule="evenodd"
              />
              <path
                id="path53"
                d="m166.68 354.17c10.747 2.92 26.489 0.845 38 3-3.826 4.43-12.18 3.432-19 4-5.531 0.461-10.662 1.682-16 1-1.27-2.4-3.65-3.69-3-8z"
                fillRule="evenodd"
              />
              <path
                id="path55"
                d="m170.68 367.17c10.801 2.198 26.444-0.444 37 2-2.889 4.485-11.055 3.441-17 4-6.758 0.635-13.233 1.746-19 0 0.73-3.06-1.72-2.95-1-6z"
                fillRule="evenodd"
              />
              <path
                id="path57"
                d="m488.68 374.17c0.512 4.178-0.558 6.775-2 9-16.852-6.815-43.47-3.863-63-8 3.548-1.777 8.4-2.888 13-3 3.412-0.084 6.501 1.773 10 2 11.57 0.75 25.73-0.85 42 0z"
                fillRule="evenodd"
              />
              <path
                id="path59"
                d="m410.68 373.17c-4.013 4.271-12.393 4.786-19 7-8.432 2.825-14.554 7.543-26 6-10.238-1.38-16.887-10.366-27-11 0.443-0.891 0.878-1.788 2-2 18.8 0.26 43.41 2.27 70 0z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path61"
                d="m41.683 374.17h19c-1.879 5.788-10.848 4.486-17 6-0.889-1.78-2.792-2.55-2-6z"
                fillRule="evenodd"
                fill="#520"
              />
              <path
                id="path63"
                d="m173.68 378.17c8.442 1.224 21.906 1.612 33 3-5.605 6.032-25.448 6.461-33 2v-5z"
                fillRule="evenodd"
              />
              <path
                id="path65"
                d="m345.68 393.17c-8.001 3.946-18.168 9.203-29 12-7.689 1.985-18.944 0.536-22 9 4.574 2.093 12.454 0.88 15 5-3.107 4.726-11.184 3.394-17 5-4.474 1.235-14.503 3.383-22 4 8.549-5.784 15.853-12.813 16-27 11.771-0.771 20.679 1.321 32 1 0.82-10.153-12.562-6.105-20-8-0.959-3.044 4.163-7.533 5-12 15.46 2.21 29.84 5.49 42 11z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path67"
                d="m491.68 397.17c-6.755 29.012-24.493 58.329-42 80-1.336 1.653-2.683 3.318-4 5-5.84 7.453-13.839 15.929-22 23-5.181 4.489-10.205 7.208-16 12-3 2.48-5.78 6.991-11 8-5.34 1.031-12.284-1.964-20-3-7.587-1.019-13.644-0.391-18-5 1.05-16.573 24.876-7.478 36-12-2.046-3.779-7.255-2.576-11-3-12.892-1.457-26.168-0.317-44-2-5.969-0.563-13.367-0.697-19-2-9.619-2.225-17.109-10.81-25-16-13.555-1.434-27.467-1.852-39-4-6.929-1.291-15.039-3.082-18-10 5.156-7.096 22.905-3.837 33-5 12.357-1.423 24.657-6.107 36-9 10.293-2.625 18.825-4 28-7 7.184-2.349 14.331-4.825 22-8 3.788-1.568 7.629-2.568 11-4 3.364-1.429 6.519-4.589 10-6 3.24-1.313 7.403-0.914 11-2 1.496-0.451 2.547-1.604 4-2 4.584-1.25 9.98-2.463 15-4 2.669-0.817 6.489-1.155 8-4-0.773-3.188-6.141-1.309-8-1-7.105 1.181-15.835 5.513-25 5-1.856-1.477-5.844-0.823-6-4-17.857 2.489-44.633 9.323-60 2 1.587-3.08 7.606-1.728 9-5 0.888-3.649-1.767-5.326 0-7 11.252-0.957 21.591-8.756 34-10 6.336-0.636 12.662 0.78 19 0 15.503-1.908 29.637-9.406 44-9 20.54 5.13 50.68 0.65 68 9zm-114 77c-9.766 0-20.788 0.917-26 2-11.982 2.49-26.318 3.036-37 5-3.593 0.66-9.368 0.24-11 4 33.44-2.347 63.871-2.577 93-8-4.18-5.01-12.81-3-19-3z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path69"
                d="m175.68 389.17c12.559 2.815 23.563 0.451 35 5-2.337 3.328-13.709 3.875-22 3-5.021-0.53-9.914-2.625-13-4v-4z"
                fillRule="evenodd"
              />
              <path
                id="path71"
                d="m173.68 400.17c21.345 7.643 45.081 7.306 69 8-5.027 5.389-15.316 3.506-24 4-15.062 0.856-31.818 1.623-43-4-0.3-3.03-3.09-3.58-2-8z"
                fillRule="evenodd"
              />
              <path
                id="path73"
                d="m46.683 415.17c8.021 7.979 17.42 14.58 29 19-0.398 4.269-8.38 0.953-12 2 0.459 5.54 5.266 6.734 6 12 12.464 0.072 25.637-3.394 39 0 7.136 1.812 13.045 8.344 20 11 7.081 2.705 15.706 2.649 24 4 22.731 3.702 47.221 7.293 75 6 5.707 6.434 9.506 10.566 20 14 9.876 3.231 23.49 3.622 37 5 5.805 0.592 10.029 4.704 16 9 6.476 4.66 11.09 8.979 22 10 5.151 0.482 11.087 0.476 17-1 5.925 5.604 5.049 13.905 11 19 7.733 6.621 20.094 5.593 33 8-42.26 27.646-100.74 37.104-153 29-5.837-0.905-8.523-1.51-15-3-16.9-3.888-33.266-9.146-48-16-13.912-6.473-25.237-12.105-38-21-35.275-24.59-66.55-64.52-82.997-107zm59.997 76c12.932 3.547 33.066-1.257 46-1 32.915 0.653 68.566 2.421 100 0-10.64 0.306-15.555-5.111-22-9-44.397 1.898-102.5 0.259-133 0 1.842 5.62 4.55 8.78 9 10zm194 41c-46.4 0-99.797 0.268-132-1-1.003-0.003-1.19 0.811-2 1-0.043 1.377 0.471 2.195 1 3 13.938 4.815 30.192 3 46 3 48.801 0 100.19 0.821 146-1-13.5-7.43-35.98-5-59-5z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path75"
                d="m396.68 477.17c-29.129 5.423-59.56 5.653-93 8 1.632-3.76 7.407-3.34 11-4 10.682-1.964 25.018-2.51 37-5 5.212-1.083 16.234-2 26-2 6.19 0 14.82-2.01 19 3z"
                fillRule="evenodd"
              />
              <path
                id="path77"
                d="m97.683 481.17c30.501 0.259 88.603 1.898 133 0 6.445 3.889 11.36 9.306 22 9-31.434 2.421-67.085 0.653-100 0-12.934-0.257-33.068 4.547-46 1-4.45-1.22-7.158-4.38-8.997-10z"
                fillRule="evenodd"
              />
              <path
                id="path79"
                d="m359.68 537.17c-45.807 1.821-97.199 1-146 1-15.808 0-32.062 1.815-46-3-0.529-0.805-1.043-1.623-1-3 0.81-0.189 0.997-1.003 2-1 32.203 1.268 85.6 1 132 1 23.02 0 45.5-2.43 59 5z"
                fillRule="evenodd"
              />
              <path
                id="path81"
                d="m398.68 91.167c-6.855 2.218-10.893 8.703-16 13-14.742 12.401-31.916 23.486-56 28-23.132 10.791-55.706 10.025-78 21-5.122 2.521-8.688 7.448-14 9-4.743 8.291-14.686 16.613-17 30-1.6 9.253-2.005 21.685 0 30 0.829 3.438 4.741 7.038 2 10-9.661-0.028-14.649-15.043-16-24-2.025-13.431 4.782-25.575 7-35 2.604-11.065 12.124-20.44 20-28 4.761-4.569 10.928-5.85 19-10 9.304-4.784 16.599-9.332 29-13 24.785-7.332 55.97-13.673 78-25 12.455-6.404 20.395-16.431 30-25 5.045-9.207 12.931-23.274 10-43-1.141-7.675-5.431-15.059-10-19 2.896-0.864 7.46 2.041 10 4 3.462 2.67 13.798 14.989 15 20 4.603 19.182-5.326 36.639-9 51 6.848-5.153 9.22-14.78 11-25 11.437 11.887 3.137 43.77-6 58-4.492 6.997-12.103 14.452-19 21-10.556 10.021-28.606 18.596-44 25-19.922 8.288-43.498 10.11-63 18 10.418-13.002 29.153-17.152 45-26 2.745-1.532 7.097-4.792 11-7 9.491-5.369 18.729-10.774 28-17 13.47-9.05 28.34-22.08 33-41.003z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path83"
                d="m370.68 121.17c-9.855 13.202-37.384 26.832-57 36-11.964 5.591-24.613 12.746-36 19-11.67 7.996-20.669 18.664-31 28-0.582 6.085-5.5 13.88-1 19-2.149 2.083-4.105-4.511-6-6-0.706-6.764 0.141-12.729 2-18 6.864-19.465 25.134-32.615 45-41 27.69-11.69 60.74-20.79 84-37z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path85"
                d="m292.68 451.17c-7.289 8.83-27.435 7.511-45 9-26.687 2.262-55.505 2.123-83-2-15.459-2.318-31.112-6.371-44-12 4.668-2.433 10.772-0.074 16 1 31.028 6.376 79.387 10.305 121 8 11.8-0.66 26.41-1.9 35-4z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path87"
                d="m417.68 41.167c7.427 0.041 14.354-0.548 24 1 11.056 7.229 19.625 12.104 25 26 8.15 21.069-3.215 52.785-16 67 20.131 19.257 37.971 42.591 52 69 7.03 13.234 11.861 28.417 17 44 6.709 20.343 10.375 38.66 12 63 5.318 79.64-26.317 147.57-66 195-18.52 22.135-44.02 41.113-69 55-32.256 17.932-69.533 31.616-116 34-110.85 5.687-200.23-55.795-243-130-11.084-19.229-21.913-40.834-28-65-3.165-12.566-6.442-25.653-8-40-8.868-81.687 18.319-152 58-200 29.772-36.017 65.746-64.329 115-82 53.13-19.061 132.96-24.64 187 1 8.059-4.255 20.531-15.245 26-26 5.957-11.716 3.125-29.688-6-40-4.963-1.625-11.658-4.852-18-2 1.478-10.792 13.057-11.663 20-11 14.444 1.378 25.316 14.776 30 26 2.09 5.003 2.65 10.24 4 14.997zm-52 91.003c-9.271 6.226-18.509 11.631-28 17-3.903 2.208-8.255 5.468-11 7-15.847 8.848-34.582 12.998-45 26 19.502-7.89 43.078-9.712 63-18 15.394-6.404 33.444-14.979 44-25 6.897-6.548 14.508-14.003 19-21 9.137-14.23 17.437-46.113 6-58-1.78 10.22-4.152 19.847-11 25 3.674-14.361 13.603-31.818 9-51-1.202-5.011-11.538-17.33-15-20-2.54-1.959-7.104-4.864-10-4 4.569 3.941 8.859 11.325 10 19 2.931 19.726-4.955 33.793-10 43-9.605 8.569-17.545 18.596-30 25-22.03 11.327-53.215 17.668-78 25-12.401 3.668-19.696 8.216-29 13-8.072 4.15-14.239 5.431-19 10-7.876 7.56-17.396 16.935-20 28-2.218 9.425-9.025 21.569-7 35 1.351 8.957 6.339 23.972 16 24 2.741-2.962-1.171-6.562-2-10-2.005-8.315-1.6-20.747 0-30 2.314-13.387 12.257-21.709 17-30 5.312-1.552 8.878-6.479 14-9 22.294-10.975 54.868-10.209 78-21 24.084-4.514 41.258-15.599 56-28 5.107-4.297 9.145-10.782 16-13-4.66 18.92-19.53 31.95-33 41zm63-59.003c2.781 18.771-6.896 36-13 45-16.971 25.021-46.947 40.7-72 51 35.139-2.632 74.774-10.967 97-38 1.368-1.665 2.277-4.552 4-7 7.165-10.182 14.383-25.429 13-43-0.863-10.971-6.385-18.428-12-24-9.584-3.083-16.304-9.03-29-9 3.81 9.833 10.47 14.636 12 24.997zm-130 20c-40.977-6.434-80.668 3.071-110 12-6.558 1.997-13.837 6.118-18 8-1.748 0.791-3.843 1.469-5 2-27.025 12.394-49.338 28.338-69 48-50.856 50.856-87.336 146.23-54 240 0.009-13.269 10.41-18.796 23-24 23.937-9.894 57.727-13.043 82-15-5.905-18.168-14.717-35.317-21-54-6.252-18.591-11.224-38.071-18-57-6.868-8.465-13.56-17.107-12-34 19.931-22.402 64.75-19.917 102-25 0.93-10.932 2.25-17.678 5-25 5.181-13.799 13.522-25.913 23-33 10.018-7.49 22.41-14.115 34-19 18.485-7.791 41.454-8.833 61-18-8.99-1.261-15.46-4.82-23-6.003zm-12 65.003c-19.866 8.385-38.136 21.535-45 41-1.859 5.271-2.706 11.236-2 18 1.895 1.489 3.851 8.083 6 6-4.5-5.12 0.418-12.915 1-19 10.331-9.336 19.33-20.004 31-28 11.387-6.254 24.036-13.409 36-19 19.616-9.168 47.145-22.798 57-36-23.26 16.21-56.31 25.31-84 37zm213 129c-5.661-32.576-18.302-61.379-33-84-0.828-1.275-0.205-3.731-1-5-1.361-2.171-3.56-4.012-5-6-8.729-12.048-23.209-29.854-33-36-0.057-0.61-0.149-1.184-1-1-33.412 27.255-101.29 20.043-148 34-0.752 4.248-7.632 2.368-9 6 32.492 4.615 91.383 12.431 69 51 22.968 7.248 38.691 23.033 34 53-1.771 11.313-10.412 25.941-19 36-10.146 11.885-26.71 27.583-38 35-2.033 1.336-4.298 1.521-5 4 5.778 3.889 16.643 2.691 20 9 0.872-1.461 0.794-3.872 4-3 5.516 4.164 12.411 3.471 19 6 4.187 1.607 7.1 5.454 12 6 4.116 0.459 10.969-1.033 15-2 9.517-2.282 18.22-6.846 28-8 13.911-1.642 31.421 1.347 48 2 16.074 0.633 24.049 1.521 37 6 10.76-29.09 11.34-72.29 6-103zm-392-70c-1.358 3.975-5.218 5.449-6 10 3.071 8.263 9.005 13.662 14 20 8.787 22.898 17.125 46.207 25 70 9.867 29.813 23.495 54.428 24 91 3.807 7.054 8.749 10.112 17 13 23.589 8.255 67.761 6.779 88-3 3.82-7.18 6.388-15.612 8-25 14.11-2.557 18.905-14.429 25-25 16.291-10.122 34.051-24.38 45-39 4.882-6.519 8.479-10.7 12-18 9.493-19.68 4.53-40.591-12-54-9.026-2.489-16.116-2.016-21 4-2.686 8.981-2.771 20.562-9 26 1.371-13.67 6.857-25.362 6-36-0.709-3.958-7.795-1.539-8-6 4.88-3.746 14.66-5.085 18-10 0.141-0.207 1.98-5.335 2-6 0.345-11.662-25.234-19.073-38-22-12.445-2.853-27.954-3.568-41-3-3.111 2.889-6.919 5.081-7 11 13.356 3.713 43.233 3.676 60 6-14.257-6.076-33.879-6.788-52-9 14.729-2.369 32.144 0.855 45 4 5.667 1.386 12.823 1.992 15 7-4.195 7.147-13.762 9.975-23 12-26.971 5.913-68.218 4.223-104 2-18.359-1.141-35.824-0.34-50-4-8.055-2.08-20.666-6.551-15-15 4.851-0.185 1.874 7.46 8 6 16.281-8.25 42.581-6.694 67-9 0.136-1.649-1.094-9.202-2-13-33.07 2.26-66.01 4.65-91 15zm36 158c-9.03-2.556-28.562 0.086-41 2-7.852 1.208-15.904 3.944-23 6-6.363 1.843-16.825 5.173-21 8-13.815 9.354-7.683 23.1 5 28 3.822 1.477 5.306 2.462 9 4 6.429 2.677 11.424 4.172 20 7 9.019 2.975 19.186 6.298 26 8 5.252 1.312 11.436 0.889 17 2 5.337 1.065 10.292 3.242 15 4 15.574 2.508 32.909 3.087 49 4 2.795 0.158 5.193 1.802 8 2 13.741 0.972 26.77-1.249 40-2 5.236-0.297 10.596 0.456 16 0 14.506-1.225 27.911-4.474 39-6 14.103-1.941 23.788-5.542 33-11-6.818-0.246-17.852-2.959-24-7-27.394 8.975-58.216 11.015-89 12-35.614 1.141-68.734-4.193-101-9-19.188-6.812-44.508-7.492-58-20-0.79-7.79 1.093-12.907 6-15 0.87 4.465-4.035 6.465-2 9 10.215 11.546 31.523 15.319 50 19 10.64 2.119 20.584 4.732 30 3-4.876-2.124-14.087 0.087-16-5 7.675-0.659 17.989 1.322 24-1-7.653-6.955-27.322-0.363-35-5 7.421-2.912 16.653-4.013 26-5-8.947-10.012-31.003 0.742-43-3 11.242-5.758 27.195-6.805 43-8 0.079-3.576-4.502-3.708-6-4-14.945-2.915-35.639 6.363-49 4 15.246-8.087 36.607-10.06 60-10 0.29-5.89-3.24-9.66-8-11zm160 7c-0.837 4.467-5.959 8.956-5 12 7.438 1.895 20.82-2.153 20 8-11.321 0.321-20.229-1.771-32-1-0.147 14.187-7.451 21.216-16 27 7.497-0.617 17.526-2.765 22-4 5.816-1.606 13.893-0.274 17-5-2.546-4.12-10.426-2.907-15-5 3.056-8.464 14.311-7.015 22-9 10.832-2.797 20.999-8.054 29-12-12.16-5.51-26.54-8.79-42-11zm120 6c-14.363-0.406-28.497 7.092-44 9-6.338 0.78-12.664-0.636-19 0-12.409 1.244-22.748 9.043-34 10-1.767 1.674 0.888 3.351 0 7-1.394 3.272-7.413 1.92-9 5 15.367 7.323 42.143 0.489 60-2 0.156 3.177 4.144 2.523 6 4 9.165 0.513 17.895-3.819 25-5 1.859-0.309 7.227-2.188 8 1-1.511 2.845-5.331 3.183-8 4-5.02 1.537-10.416 2.75-15 4-1.453 0.396-2.504 1.549-4 2-3.597 1.086-7.76 0.687-11 2-3.481 1.411-6.636 4.571-10 6-3.371 1.432-7.212 2.432-11 4-7.669 3.175-14.816 5.651-22 8-9.175 3-17.707 4.375-28 7-11.343 2.893-23.643 7.577-36 9-10.095 1.163-27.844-2.096-33 5 2.961 6.918 11.071 8.709 18 10 11.533 2.148 25.445 2.566 39 4 7.891 5.19 15.381 13.775 25 16 5.633 1.303 13.031 1.437 19 2 17.832 1.683 31.108 0.543 44 2 3.745 0.424 8.954-0.779 11 3-11.124 4.522-34.95-4.573-36 12 4.356 4.609 10.413 3.981 18 5 7.716 1.036 14.66 4.031 20 3 5.22-1.009 8-5.52 11-8 5.795-4.792 10.819-7.511 16-12 8.161-7.071 16.16-15.547 22-23 1.317-1.682 2.664-3.347 4-5 17.507-21.671 35.245-50.988 42-80-17.32-8.35-47.46-3.87-68-9zm-294 134c12.763 8.895 24.088 14.527 38 21 14.734 6.854 31.1 12.112 48 16 6.477 1.49 9.163 2.095 15 3 52.257 8.104 110.74-1.354 153-29-12.906-2.407-25.267-1.379-33-8-5.951-5.095-5.075-13.396-11-19-5.913 1.476-11.849 1.482-17 1-10.91-1.021-15.524-5.34-22-10-5.971-4.296-10.195-8.408-16-9-13.51-1.378-27.124-1.769-37-5-10.494-3.434-14.293-7.566-20-14-27.779 1.293-52.269-2.298-75-6-8.294-1.351-16.919-1.295-24-4-6.955-2.656-12.864-9.188-20-11-13.363-3.394-26.536 0.072-39 0-0.734-5.266-5.541-6.46-6-12 3.62-1.047 11.602 2.269 12-2-11.58-4.42-20.979-11.021-29-19 16.45 42.48 47.725 82.41 83 107zm128-67c-41.613 2.305-89.972-1.624-121-8-5.228-1.074-11.332-3.433-16-1 12.888 5.629 28.541 9.682 44 12 27.495 4.123 56.313 4.262 83 2 17.565-1.489 37.711-0.17 45-9-8.59 2.1-23.2 3.34-35 4z"
                fillRule="evenodd"
              />
              <path
                id="path89"
                d="m198.68 202.17c0.906 3.798 2.136 11.351 2 13-24.419 2.306-50.719 0.75-67 9-6.126 1.46-3.149-6.185-8-6-5.666 8.449 6.945 12.92 15 15 14.176 3.66 31.641 2.859 50 4 35.782 2.223 77.029 3.913 104-2 9.238-2.025 18.805-4.853 23-12-2.177-5.008-9.333-5.614-15-7-12.856-3.145-30.271-6.369-45-4 18.121 2.212 37.743 2.924 52 9-16.767-2.324-46.644-2.287-60-6 0.081-5.919 3.889-8.111 7-11 13.046-0.568 28.555 0.147 41 3 12.766 2.927 38.345 10.338 38 22-0.02 0.665-1.859 5.793-2 6-3.34 4.915-13.12 6.254-18 10 0.205 4.461 7.291 2.042 8 6 0.857 10.638-4.629 22.33-6 36 6.229-5.438 6.314-17.019 9-26 4.884-6.016 11.974-6.489 21-4 16.53 13.409 21.493 34.32 12 54-3.521 7.3-7.118 11.481-12 18-10.949 14.62-28.709 28.878-45 39-6.095 10.571-10.89 22.443-25 25-1.612 9.388-4.18 17.82-8 25-20.239 9.779-64.411 11.255-88 3-8.251-2.888-13.193-5.946-17-13-0.505-36.572-14.133-61.187-24-91-7.875-23.793-16.213-47.102-25-70-4.995-6.338-10.929-11.737-14-20 0.782-4.551 4.642-6.025 6-10 24.99-10.35 57.93-12.74 91-15zm-88 22c2.213 5.122 5.673 11.045 10 13 1.454 0.657 5.56 1.481 8 2 3.745 0.796 9.659 1.815 14 2 3.388 0.144 9.316 1.492 10-2-14.95-0.3-32.442-6.041-38-19h-3c0.23 1.89-1.12 2.2-1 4zm47 29c12.951 1.993 25.609 4.033 37 4 33.375-0.096 68.283 0.417 90-7-51.306 2.555-123.53 6.647-165-12 2.6 13.31 21.33 12.43 38 15zm-22 9c14.897 3.436 33.906 2.761 51 4-2.075-3.328-7.94-4.292-12-5-10.571-1.842-21.448-1.671-30-3-2.963-0.704-4.354-2.979-9-2v6zm1 11c13.631 5.53 26.316 2.997 43 3-3.006-6.51-11.526-3.524-17-4-9.483-0.825-18.193-3.599-26-5v6zm163 82c4.91-4.231 13.015-8.691 17-12 1.127-0.936 4.284-1.33 5-2 0.986-0.924 1.007-3.161 2-4 13.409-11.326 29.212-26.115 31-45 0.913-9.641-1.701-12.609-6-17-22.362-3.696-19.745 17.588-35 21-8.177 29.49-22.234 53.099-31 82 6.68-5.18 9.39-16.44 17-23zm-160-71c9.904 6.096 30.365 1.635 45 3-2.168-4.853-9.113-3.57-14-4-10.522-0.926-20.571-2.347-31-3v4zm4 15c10.837-0.182 24.059 0.243 34 0 3.139-0.077 8.739 1.732 10-2-13.216-3.707-29.723-1.744-46-6 0.25 3.08 1.02 5.65 2 8zm4 12c10.085-0.227 22.717 0.303 32 0 2.797-0.092 8.239 1.694 9-2-13.954-3.571-26.876-2.903-43-5-1.14 4.14 2.11 3.89 2 7zm4 11c4.522 1.265 11.228 1.034 18 1 6.314-0.032 14.792 1.647 17-3-13.11-2.084-23.636-1.476-37-4-0.48 3.15 3.07 2.26 2 6zm5 13c4.955-0.024 11.114 0.031 17 0 5.325-0.028 12.463 1.691 15-2-1.551-3.021-6.855-2.718-10-3-8.882-0.798-16.371-0.899-24-3 0.16 3.18 2.27 4.4 2 8zm5 12c9.8 2.132 24.093 1.004 33-1-3.13-5.514-11.928-2.455-19-3-5.384-0.415-10.554-2.556-15-2-0.057-0.61-0.149-1.184-1-1 0.17 2.83 1.84 4.16 2 7zm8 15c5.338 0.682 10.469-0.539 16-1 6.82-0.568 15.174 0.43 19-4-11.511-2.155-27.253-0.08-38-3-0.65 4.31 1.73 5.6 3 8zm2 11c5.767 1.746 12.242 0.635 19 0 5.945-0.559 14.111 0.485 17-4-10.556-2.444-26.199 0.198-37-2-0.72 3.05 1.73 2.94 1 6zm2 10c7.552 4.461 27.395 4.032 33-2-11.094-1.388-24.558-1.776-33-3v5zm2 10c3.086 1.375 7.979 3.47 13 4 8.291 0.875 19.663 0.328 22-3-11.437-4.549-22.441-2.185-35-5v4zm0 15c11.182 5.623 27.938 4.856 43 4 8.684-0.494 18.973 1.389 24-4-23.919-0.694-47.655-0.357-69-8-1.09 4.42 1.7 4.97 2 8z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path91"
                d="m493.68 390.17c-12.951-4.479-20.926-5.367-37-6-16.579-0.653-34.089-3.642-48-2-9.78 1.154-18.483 5.718-28 8-4.031 0.967-10.884 2.459-15 2-4.9-0.546-7.813-4.393-12-6-6.589-2.529-13.484-1.836-19-6-3.206-0.872-3.128 1.539-4 3-3.357-6.309-14.222-5.111-20-9 0.702-2.479 2.967-2.664 5-4 11.29-7.417 27.854-23.115 38-35 8.588-10.059 17.229-24.687 19-36 4.691-29.967-11.032-45.752-34-53 22.383-38.569-36.508-46.385-69-51 1.368-3.632 8.248-1.752 9-6 46.711-13.957 114.59-6.745 148-34 0.851-0.184 0.943 0.39 1 1 9.791 6.146 24.271 23.952 33 36 1.44 1.988 3.639 3.829 5 6 0.795 1.269 0.172 3.725 1 5 14.698 22.621 27.339 51.424 33 84 5.34 30.71 4.76 73.91-6 103zm-51-211c-3.346-4.086-10.259-14.135-15-13-5.771 1.381-10.661 4.864-16 7-16.047 6.42-35.02 10.557-55 13-20.271 2.479-40.452 0.801-56 8 51.304 2.05 98.406 0.414 152 1-1.65-5.75-5.44-10.44-10-16zm-95 34c3.053 11.486 4.212 16.031 0 28 6.189 8.112 17.466 7 29 7 34.827 0 76.699 0.948 105-1-5.952-17.714-14.76-32.574-24-47h-124c1.99 7.01 10.35 7.65 14 13zm23 42c-1.003-0.003-1.19 0.81-2 1-0.61 0.057-1.184 0.149-1 1 6.477 8.856 12.065 18.602 13 33 31.656 2.24 75.432 0.4 112 1-0.57-14.096-5.29-24.043-8-36-35.61 2.34-91.73 0.1-114 0zm10 45c-1.406 0.261-1.14 2.193-2 3 0.115 8.143-6.556 15.385-9 24 42.544 0.147 87.766-0.575 126 1 0.974-6.777-0.638-18.355 0-28h-115zm-21 38c-3.75 4.807-7.695 9.001-12 13-3.36 3.122-8.95 5.87-10 11 57.961-3.393 109.98 1.607 157-1-0.467-8.467 1.777-14.223 1-23-46.63 2.71-86.96-1.04-136 0zm87 36c-3.499-0.227-6.588-2.084-10-2-4.6 0.112-9.452 1.223-13 3 19.53 4.137 46.148 1.185 63 8 1.442-2.225 2.512-4.822 2-9-16.27-0.85-30.43 0.75-42 0zm-106-1c-1.122 0.212-1.557 1.109-2 2 10.113 0.634 16.762 9.62 27 11 11.446 1.543 17.568-3.175 26-6 6.607-2.214 14.987-2.729 19-7-26.59 2.27-51.2 0.26-70 0z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path93"
                d="m151.68 386.17c-23.393-0.06-44.754 1.913-60 10 13.361 2.363 34.055-6.915 49-4 1.498 0.292 6.079 0.424 6 4-15.805 1.195-31.758 2.242-43 8 11.997 3.742 34.053-7.012 43 3-9.347 0.987-18.579 2.088-26 5 7.678 4.637 27.347-1.955 35 5-6.011 2.322-16.325 0.341-24 1 1.913 5.087 11.124 2.876 16 5-9.416 1.732-19.36-0.881-30-3-18.477-3.681-39.785-7.454-50-19-2.035-2.535 2.87-4.535 2-9-4.907 2.093-6.79 7.21-6 15 13.492 12.508 38.812 13.188 58 20 32.266 4.807 65.386 10.141 101 9 30.784-0.985 61.606-3.025 89-12 6.148 4.041 17.182 6.754 24 7-9.212 5.458-18.897 9.059-33 11-11.089 1.526-24.494 4.775-39 6-5.404 0.456-10.764-0.297-16 0-13.23 0.751-26.259 2.972-40 2-2.807-0.198-5.205-1.842-8-2-16.091-0.913-33.426-1.492-49-4-4.708-0.758-9.663-2.935-15-4-5.564-1.111-11.748-0.688-17-2-6.814-1.702-16.981-5.025-26-8-8.576-2.828-13.571-4.323-20-7-3.694-1.538-5.178-2.523-9-4-12.683-4.9-18.815-18.646-5-28 4.175-2.827 14.637-6.157 21-8 7.096-2.056 15.148-4.792 23-6 12.438-1.914 31.97-4.556 41-2 4.76 1.34 8.29 5.11 8 11z"
                fillRule="evenodd"
                fill="#fff"
              />
              <path
                id="path3159"
                d="m126.92 226.3c12.431 17.584 137.13 11.6 144.72 11.576 19.754-0.0623 44.671-8.5604 45.046-15.279-8.0524-0.4294-22.786-2.4528-37.531-3.2025-11.623-0.59092-27.006-3.6182-33.733-4.3771-2.4953-0.28146-1.6751 5.2458-0.17674 7.5334 1.3306 2.0314-4.6809-6.4587-7.1314-6.6547-35.553 27.556-9.1468-0.45137-40.183-0.29898-29.115 0.92328-54.757 2.7017-71.015 10.703z"
                stroke="#28170b"
                strokeWidth="1px"
                fill="#28170b"
              />
              <path
                id="path3159-1"
                d="m126.44 225.59c-5.6118 7.8408 104.65-7.9504 144.72 11.576 17.758 8.6523 44.671-8.5604 45.046-15.279-8.0524-0.4294-22.786-2.4528-37.531-3.2025-11.623-0.59092-27.006-3.6182-33.733-4.3771-2.4953-0.28146-1.6751 2.7982-0.17674 5.0858 6.0769-4.1338-10.5-2.1371-22.987 5.3834-3.2583 1.9624-3.1824-6.3358-6.9379-4.9567-7.3132 2.6857-12.241-5.4571-17.389-4.9328-29.115 0.92328-54.757 2.7017-71.015 10.703z"
                fill="url(#linearGradient3185)"
              />
              <path
                id="path3208"
                d="m370.25 328.95a102.19 134.03 0 1 1 -204.38 0 102.19 134.03 0 1 1 204.38 0z"
                transform="translate(-.0018904)"
                fill="none"
              />
              <path
                id="path3206-7"
                fill="#c87137"
                d="m266.21 58.951c-147.02 0-266.22 120.36-266.22 268.81 0 148.46 119.2 268.81 266.22 268.81s266.22-120.36 266.22-268.81c0-75.564-31.621-145.33-81.335-194.17-6.9888 7.6875-17.833 15.375-26.796 23.063 44.089 42.936 75.943 104.55 75.943 171.11 0 130.46-105.28 236.22-235.13 236.22-129.83 0-235.24-105.75-235.11-236.22 0.13-130.33 108.01-233.48 235.13-236.22 22.566-0.4853 37.736 2.4504 58.398 8.4158 13.499-5.1732 26.319-11.703 37.848-20.817-18.25-10.185-62.94-20.188-95.16-20.188z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}