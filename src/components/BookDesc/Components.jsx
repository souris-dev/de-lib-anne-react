export const Star = (props) =>
  props.filled ? (
    <svg
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="inline w-5 h-5 pr-1 text-yellow-400"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
  ) : (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="inline w-5 h-5 pr-1 text-yellow-400"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    </svg>
  );

export function Stars(props) {
  /**
   * Referred https://www.carlrippon.com/repeat-element-n-times-in-jsx/
   */
  return (
    <span className="inline">
      {[...Array(Math.round(props.nstars))].map((_, i) => (
        <Star filled key={i} />
      ))}
      {[...Array(5 - Math.round(props.nstars))].map((_, i) => (
        <Star filled={false} key={i + 10} />
      ))}
    </span>
  );
}

const Tag = (props) => (
  <div className="flex flex-row px-3 py-1 my-auto mt-3 mr-3 text-sm text-black bg-yellow-300 rounded-lg item-center">
    {props.tag}
  </div>
);

export function Tags(props) {
  return (
    <div className="flex flex-row flex-wrap">
      {props.tags.map((tag) => (
        <Tag tag={tag} key={Math.random() * 100} />
      ))}
    </div>
  );
}
