import { useEffect, useState } from "react";

const SelectableTag = (props) => {
  return (
    <div
      onClick={() => props.onClick(props.tag)}
      className={`cursor-pointer ${
        props.isOn ? "bg-yellow-900 text-white" : "bg-yellow-300 text-black"
      } px-3 mr-3 mt-3 py-1 rounded-lg text-sm flex flex-row item-center my-auto`}
    >
      {props.tag}
    </div>
  );
};

// utility function
const addOrRemoveTag = (arr, item) =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

export function SelectableTags(props) {
  const [tags, setTags] = useState([]);
  const [tagIsOn, setTagIsOn] = useState({});

  useEffect(() => {
    var tagsOnInit = {};
    props.tags.forEach((tag) => (tagsOnInit[tag] = false));

    setTagIsOn(tagsOnInit);
  }, []);

  /**
   * See https://dev.to/stephane/how-to-make-sure-useeffect-catches-array-changes-fm3
   */
  useEffect(() => {
    var tagsOn = {};
    tags.forEach((tag) => (tagsOn[tag] = true));
    props.onClick(tags);

    setTagIsOn(tagsOn);
  }, [JSON.stringify(tags)]);

  return (
    <div
      className="flex flex-row flex-wrap"
    >
      {props.tags.map((tag) => (
        <SelectableTag
          tag={tag}
          key={tag}
          isOn={tagIsOn[tag] || false}
          onClick={(tagName) => {
            setTags(addOrRemoveTag(tags, tagName));
          }}
        />
      ))}
    </div>
  );
}
