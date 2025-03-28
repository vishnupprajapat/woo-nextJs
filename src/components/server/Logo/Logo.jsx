// import cn from 'clsx';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }) {
  return (
    <Link
      href={process.env.FRONTEND_URL }
      className={cn(
        className && className,
        'inline-flex items-center',
      )}
    >
      <svg
        role="img"
        className="w-16 h-16"
        viewBox="0 0 177.27899 177.17758"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="linearGradient4987">
            <stop style={{ stopColor: "#457b9d", stopOpacity: "1" }} offset="0" />
            <stop style={{ stopColor: "#457b9d", stopOpacity: "0" }} offset="1" />
          </linearGradient>
          <linearGradient id="linearGradient4540">
            <stop style={{ stopColor: "#f1faee", stopOpacity: "1" }} offset="0" />
            <stop style={{ stopColor: "#457b9d", stopOpacity: "1" }} offset="1" />
          </linearGradient>
        </defs>
        <g transform="translate(-24.196996,-62.039592)">
          <path
            className="ghost-body"
            style={{ fill: "#e63946", fillOpacity: "1" }}
            d="m 92.423219,64.549439 c -36.73501,10.57719 -58.073058,51.510361 -47.085986,86.628681 10.987072,35.11832 38.813875,61.19825 55.491517,87.4188 l 24.57751,-60.42174 52.85073,38.1278 c 0,0 7.81634,-71.22793 0.61813,-103.57447 -7.16614,-32.202429 -49.71686,-58.756107 -86.4519,-48.17903 z m -26.40159,53.160201 c 14.03161,-4.03995 28.681541,4.0597 32.721818,18.09121 4.040283,14.03172 -4.059352,28.68198 -18.09106,32.72232 -14.031917,4.04034 -28.682348,-4.05958 -32.72246,-18.09156 -4.04001,-14.0318 4.059909,-28.68191 18.091702,-32.72197 z M 143.44987,95.415697 c 14.03172,-4.040284 28.68198,4.059358 32.72231,18.091063 4.04034,14.03192 -4.05957,28.68235 -18.09155,32.72246 -14.03181,4.04001 -28.68192,-4.05991 -32.72197,-18.0917 -4.03995,-14.03161 4.05969,-28.681545 18.09121,-32.721823 z"
          />
          <g
            className="ghost-eyes"
            style={{ display: "inline", fill: "#457b9d", fillOpacity: "1", stroke: "url(#linearGradient4987)", strokeOpacity: "1" }}
          >
            <path
              className="ghost-left-eye"
              d="m 66.021629,117.70964 c 14.03161,-4.03995 28.681541,4.0597 32.721818,18.09121 4.040283,14.03172 -4.059352,28.68198 -18.09106,32.72232 -14.031917,4.04034 -28.682348,-4.05958 -32.72246,-18.09156 -4.04001,-14.0318 4.059909,-28.68191 18.091702,-32.72197 z"
              />
            <path
              className="ghost-right-eye"
              d="m 143.44987,95.415697 c 14.03172,-4.040284 28.68198,4.059358 32.72231,18.091063 4.04034,14.03192 -4.05957,28.68235 -18.09155,32.72246 -14.03181,4.04001 -28.68192,-4.05991 -32.72197,-18.0917 -4.03995,-14.03161 4.05969,-28.681545 18.09121,-32.721823 z"
              />
          </g>
          <g
            className="ghost-inner-eyes"
            style={{ display: "inline", fill: "url(#linearGradient4540)", fillOpacity: "1", stroke: "none", strokeOpacity: "1" }}
            transform="translate(2.6458334,7.4083337)">
            <path
              className="ghost-inner-right-eye"
              d="m 146.24401,105.1196 c 8.67241,-2.49712 17.7271,2.50892 20.22426,11.18131 2.49716,8.67253 -2.50905,17.72733 -11.18161,20.22435 -8.67246,2.49696 -17.72707,-2.50925 -20.22404,-11.1817 -2.49692,-8.67234 2.50911,-17.72684 11.18139,-20.22396 z"
            />
            <path
              className="ghost-inner-left-eye"
              d="m 68.815627,127.41373 c 8.672267,-2.4969 17.72669,2.5091 20.223792,11.18131 2.497105,8.67233 -2.508892,17.72696 -11.18122,20.2241 -8.672457,2.49714 -17.727188,-2.50903 -20.224189,-11.18153 -2.496937,-8.67238 2.509236,-17.72691 11.181617,-20.22388 z"
            />
          </g>
        </g>
      </svg>
      <h1 className="m-0 font-serif text-3xl font-bold text-peppermint">{process.env.SITE_NAME}</h1>
    </Link>
  );
}
