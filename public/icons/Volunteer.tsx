import { cn } from "@/lib/utils";

export function Volunteer({ className }: { className?: string }) {
  return (
    <svg
      width="107"
      height="107"
      viewBox="0 0 107 107"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-[104px] w-[104px]", className)}
    >
      <circle cx="53.5" cy="53.5" r="53.5" fill="white" />
      <circle
        cx="53.5"
        cy="53.5"
        r="49"
        stroke="#219D80"
        strokeOpacity="0.15"
        strokeWidth="9"
      />
      <g clipPath="url(#clip0_1_33932)">
        <path
          d="M35.8446 39.1441C38.2814 39.1441 40.2584 37.1671 40.2584 34.7304C40.2584 32.2936 38.2814 30.3166 35.8446 30.3166C33.4079 30.3166 31.4309 32.2936 31.4309 34.7304C31.4309 37.1671 33.4079 39.1441 35.8446 39.1441ZM71.1546 39.1441C73.5914 39.1441 75.5684 37.1671 75.5684 34.7304C75.5684 32.2936 73.5914 30.3166 71.1546 30.3166C68.7178 30.3166 66.7409 32.2936 66.7409 34.7304C66.7409 37.1671 68.7178 39.1441 71.1546 39.1441ZM82.7131 73.3598L78.6672 63.245L74.8879 67.5116L74.704 69.1852L77.2511 75.5483C77.7109 76.6977 78.8143 77.3966 79.9821 77.3966C80.3499 77.3966 80.7177 77.3322 81.0763 77.1851C82.5844 76.5782 83.32 74.8679 82.7131 73.3598ZM79.5683 54.0681L77.8672 46.6935C77.4442 44.8544 76.1569 43.3096 74.4189 42.5648C72.7178 41.8291 70.8328 41.9487 69.2604 42.8682C67.173 44.1004 65.6098 46.0406 64.8374 48.3302L63.7984 51.4474L62.3271 52.3854V43.5579C62.3271 42.7487 61.665 42.0866 60.8559 42.0866H46.1434C45.3342 42.0866 44.6721 42.7487 44.6721 43.5579V52.3854L43.1917 51.4474L42.1526 48.3302C41.3894 46.0314 39.817 44.1004 37.7297 42.8682C36.1481 41.9487 34.2722 41.8291 32.5711 42.5648C30.8332 43.3096 29.5458 44.8544 29.1228 46.6935L27.4309 54.0681C27.0079 55.9072 27.4953 57.8566 28.755 59.2818L34.9343 66.2611L35.863 74.7759C36.0285 76.2748 37.2975 77.3966 38.7871 77.3966C38.8975 77.3966 38.9986 77.3874 39.109 77.3782C40.7273 77.2035 41.8859 75.7506 41.7112 74.1323L40.7825 65.599C40.6446 64.4036 40.148 63.291 39.348 62.3807L35.3665 57.875L36.9848 51.4107L37.6101 53.2865C37.9871 54.4359 38.7044 55.4382 39.863 56.2842L44.5618 59.2726C44.9848 59.5393 45.6744 59.6956 46.1434 59.7324H60.8559C61.3248 59.6956 62.0145 59.5393 62.4375 59.2726L67.1363 56.2842C68.2949 55.4382 69.0121 54.4451 69.3891 53.2865L70.0144 51.4107L71.6328 57.875L67.6512 62.3807C66.8512 63.291 66.3547 64.4036 66.2167 65.599L65.288 74.1323C65.1133 75.7506 66.2811 77.2035 67.8903 77.3782C68.0006 77.3874 68.1018 77.3966 68.2121 77.3966C69.6926 77.3966 70.9707 76.284 71.1362 74.7759L72.0649 66.2611L78.2442 59.2818C79.4947 57.8566 79.9913 55.9072 79.5683 54.0681ZM28.332 63.245L24.2861 73.3598C23.6792 74.8679 24.4148 76.5782 25.9229 77.1851C27.4677 77.792 29.1504 77.0288 29.7481 75.5483L32.2952 69.1852L32.1113 67.5116L28.332 63.245Z"
          fill="#23C0ED"
        />
      </g>
      <mask id="path-4-inside-1_1_33932" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M69.2316 2.36522C59.4068 -0.657391 48.9477 -0.777655 39.1015 1.97392C36.9706 2.56941 35.8975 4.88209 36.6508 6.96248C37.404 9.04296 39.6982 10.1003 41.8372 9.53437C45.5593 8.54962 49.4684 8.02497 53.5 8.02497C78.6152 8.02497 98.975 28.3848 98.975 53.4999C98.975 78.6151 78.6152 98.9749 53.5 98.9749C28.3849 98.9749 8.02505 78.6151 8.02505 53.4999C8.02505 53.2145 8.02768 52.9297 8.03292 52.6455C8.07372 50.4314 6.49755 48.4548 4.29576 48.2185C2.09207 47.982 0.0980081 49.5777 0.0272593 51.7929C-0.299009 62.0087 2.30852 72.1357 7.58266 80.9561C13.5453 90.928 22.5921 98.6877 33.3555 103.062C44.119 107.437 56.0141 108.189 67.2427 105.205C78.4714 102.22 88.4234 95.6615 95.5943 86.5199C102.765 77.3783 106.765 66.1508 106.99 54.5344C107.215 42.9181 103.652 31.5443 96.8395 22.1323C90.0274 12.7203 80.3365 5.78164 69.2316 2.36522Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69.2316 2.36522C59.4068 -0.657391 48.9477 -0.777655 39.1015 1.97392C36.9706 2.56941 35.8975 4.88209 36.6508 6.96248C37.404 9.04296 39.6982 10.1003 41.8372 9.53437C45.5593 8.54962 49.4684 8.02497 53.5 8.02497C78.6152 8.02497 98.975 28.3848 98.975 53.4999C98.975 78.6151 78.6152 98.9749 53.5 98.9749C28.3849 98.9749 8.02505 78.6151 8.02505 53.4999C8.02505 53.2145 8.02768 52.9297 8.03292 52.6455C8.07372 50.4314 6.49755 48.4548 4.29576 48.2185C2.09207 47.982 0.0980081 49.5777 0.0272593 51.7929C-0.299009 62.0087 2.30852 72.1357 7.58266 80.9561C13.5453 90.928 22.5921 98.6877 33.3555 103.062C44.119 107.437 56.0141 108.189 67.2427 105.205C78.4714 102.22 88.4234 95.6615 95.5943 86.5199C102.765 77.3783 106.765 66.1508 106.99 54.5344C107.215 42.9181 103.652 31.5443 96.8395 22.1323C90.0274 12.7203 80.3365 5.78164 69.2316 2.36522Z"
        fill="#C4C4C4"
      />
      <path
        d="M69.2316 2.36522L71.8781 -6.2369V-6.2369L69.2316 2.36522ZM7.58266 80.9561L-0.141768 85.5749H-0.141766L7.58266 80.9561ZM33.3555 103.062L36.7443 94.7249H36.7443L33.3555 103.062ZM67.2427 105.205L64.9309 96.5067L67.2427 105.205ZM106.99 54.5344L97.9917 54.3604V54.3604L106.99 54.5344ZM8.03292 52.6455L-0.965551 52.4796L8.03292 52.6455ZM39.1015 1.97392L36.6792 -6.69398L39.1015 1.97392ZM41.5238 10.6418C49.7135 8.35315 58.4132 8.45323 66.5852 10.9673L71.8781 -6.2369C60.4004 -9.76801 48.1819 -9.90846 36.6792 -6.69398L41.5238 10.6418ZM44.1392 18.235C47.1166 17.4472 50.2522 17.025 53.5 17.025V-0.975028C48.6845 -0.975028 44.0019 -0.348003 39.5353 0.833742L44.1392 18.235ZM53.5 17.025C73.6446 17.025 89.975 33.3554 89.975 53.4999H107.975C107.975 23.4142 83.5857 -0.975028 53.5 -0.975028V17.025ZM89.975 53.4999C89.975 73.6445 73.6446 89.9749 53.5 89.9749V107.975C83.5857 107.975 107.975 83.5856 107.975 53.4999H89.975ZM53.5 89.9749C33.3555 89.9749 17.0251 73.6445 17.0251 53.4999H-0.974945C-0.974945 83.5856 23.4143 107.975 53.5 107.975V89.9749ZM17.0251 53.4999C17.0251 53.2698 17.0272 53.0402 17.0314 52.8113L-0.965551 52.4796C-0.971806 52.8191 -0.974945 53.1592 -0.974945 53.4999H17.0251ZM15.3071 76.3373C10.9202 69.0008 8.75129 60.5774 9.02267 52.0802L-8.96815 51.5056C-9.34931 63.4401 -6.30318 75.2706 -0.141768 85.5749L15.3071 76.3373ZM36.7443 94.7249C27.7915 91.0861 20.2667 84.6317 15.3071 76.3373L-0.141766 85.5749C6.82393 97.2243 17.3926 106.289 29.9667 111.4L36.7443 94.7249ZM64.9309 96.5067C55.5911 98.9892 45.6971 98.3637 36.7443 94.7249L29.9667 111.4C42.5409 116.511 56.437 117.389 69.5546 113.903L64.9309 96.5067ZM88.513 80.9652C82.5484 88.5689 74.2706 94.0243 64.9309 96.5067L69.5546 113.903C82.6722 110.416 94.2983 102.754 102.676 92.0747L88.513 80.9652ZM97.9917 54.3604C97.8048 64.0226 94.4776 73.3614 88.513 80.9652L102.676 92.0747C111.053 81.3953 115.726 68.279 115.988 54.7085L97.9917 54.3604ZM89.5488 27.4091C95.2149 35.2378 98.1785 44.6982 97.9917 54.3604L115.988 54.7085C116.251 41.1379 112.088 27.8508 104.13 16.8555L89.5488 27.4091ZM66.5852 10.9673C75.822 13.809 83.8826 19.5804 89.5488 27.4091L104.13 16.8555C96.1722 5.86011 84.8511 -2.24575 71.8781 -6.2369L66.5852 10.9673ZM5.25628 39.2699C-1.69501 38.5238 -8.71588 43.6065 -8.96815 51.5056L9.02267 52.0802C8.91189 55.5488 5.87915 57.4402 3.33524 57.1671L5.25628 39.2699ZM17.0314 52.8113C17.1489 46.4333 12.5725 40.0552 5.25628 39.2699L3.33524 57.1671C0.422623 56.8545 -1.00148 54.4295 -0.965551 52.4796L17.0314 52.8113ZM28.1883 10.0264C30.6956 16.9513 37.9843 19.8634 44.1392 18.235L39.5353 0.833742C41.4121 0.337179 44.1125 1.13463 45.1132 3.89859L28.1883 10.0264ZM36.6792 -6.69398C29.0726 -4.56828 25.8095 3.45595 28.1883 10.0264L45.1132 3.89859C45.9856 6.30822 44.8686 9.7071 41.5238 10.6418L36.6792 -6.69398Z"
        fill="#23C0ED"
        mask="url(#path-4-inside-1_1_33932)"
      />
      <defs>
        <clipPath id="clip0_1_33932">
          <rect
            width="58.85"
            height="47.08"
            fill="white"
            transform="translate(24.0752 30.3166)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
