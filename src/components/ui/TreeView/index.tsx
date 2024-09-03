"use client";

import { CSSProperties, useState } from "react";
import { TreeViewItem } from "@/types/ui";
import { cn } from "@/utils/styles";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cva, VariantProps } from "class-variance-authority";

const styleVariants = cva("relative flex items-center rounded-lg transition-colors border-black", {
  variants: {
    theme: {
      default:
        "text-main-gray hover:text-main-black data-[selected]:bg-muted data-[selected]:text-main-black",
      navy: "text-snow-white hover:text-[#bcbcbc] data-[selected]:bg-info data-[selected]:hover:text-snow-white",
    },
  },
  defaultVariants: {
    theme: "default",
  },
});

interface TreeViewProps<T extends TreeViewItem> {
  list: T[];
  depth?: number;
  className?: string;
  style?: CSSProperties;
  /**
   * 펼쳐진 아이템의 id 목록
   */
  expandedItems?: string[];
  /**
   * 선택된 아이템의 id 목록
   */
  selectedItems?: string[];
  /**
   * 트리 아이템을 클릭했을 때 링크로 이동할지 여부
   */
  useLink?: boolean;
  /**
   * 트리 아이템 테마
   */
  theme?: VariantProps<typeof styleVariants>["theme"];
  /**
   * 펼침/닫힘 아이콘 클릭했을 때 호출되는 함수
   * @param id 선택된 아이템의 id
   */
  onChangeExpand?: (id: string) => void;
  /**
   * 트리 아이템 클릭했을 때 호출되는 함수
   * @param id 선택된 아이템의 id
   */
  onChangeSelect?: (id: string) => void;
}

const TreeView = <T extends TreeViewItem>({
  list,
  depth = 0,
  className,
  expandedItems,
  selectedItems,
  style,
  useLink = false,
  theme,
  onChangeExpand,
  onChangeSelect,
}: TreeViewProps<T>) => {
  const router = useRouter();

  const handleClickItem = (href?: string) => {
    if (href) {
      router.push(href || "#", { scroll: false });
    }
  };

  return (
    <ul className={(cn("flex flex-col"), className)} style={style}>
      {list.map((item, index) => (
        <TreeItem
          key={index}
          item={item}
          depth={depth}
          expandedItems={expandedItems}
          selectedItems={selectedItems}
          useLink={useLink}
          theme={theme}
          onClickItem={handleClickItem}
          onChangeExpand={onChangeExpand}
          onChangeSelect={onChangeSelect}
        />
      ))}
    </ul>
  );
};

interface TreeItemProps<T extends TreeViewItem> {
  item: T;
  depth: number;
  onClickItem?: (href?: string) => void;
  expandedItems?: string[];
  selectedItems?: string[];
  onChangeExpand?: (id: string) => void;
  onChangeSelect?: (id: string) => void;
  useLink?: boolean;
  theme?: VariantProps<typeof styleVariants>["theme"];
}

const TreeItem = <T extends TreeViewItem>({
  item,
  depth,
  expandedItems,
  selectedItems,
  useLink = false,
  theme,
  onChangeExpand,
  onChangeSelect,
}: TreeItemProps<T>) => {
  const key = useLink && item.href ? item.href : item.id;
  const [isExpanded, setIsExpanded] = useState(expandedItems?.includes(item.id) ? true : false);

  const handleClickItem = () => {
    onChangeSelect?.(key);
    if (!isExpanded) {
      setIsExpanded(true);
      onChangeExpand?.(item.id);
    }
  };

  const handleClickIcon = () => {
    setIsExpanded(prev => !prev);
    onChangeExpand?.(item.id);
  };

  return (
    <li className="cursor-pointer" aria-expanded={isExpanded}>
      <div
        className={cn(styleVariants({ theme }), {
          "pl-3": depth === 1,
          "pl-6": depth === 2,
          "pl-9": depth === 3,
        })}
        data-selected={selectedItems?.includes(key) ? "selected" : undefined}
        onClick={handleClickItem}
      >
        <div
          className={cn("w-4 h-full shrink-0 cursor-pointer")}
          onMouseDown={e => e.preventDefault()}
          onClick={handleClickIcon}
        >
          {item.children?.length && (
            <ChevronRight
              size={16}
              strokeWidth={2}
              className={cn({
                "rotate-90": isExpanded,
              })}
            />
          )}
        </div>
        <div className="grow flex items-center gap-3 py-2 pl-2 pr-4">{item.label}</div>
      </div>
      {item.children?.length && isExpanded && (
        <TreeView
          list={item.children}
          depth={depth + 1}
          className={cn("transition-[height] duration-0", {
            // "duration-300 min-h-0 h-auto": isExpanded,
            // "max-h-0": !isExpanded,
          })}
          expandedItems={expandedItems}
          selectedItems={selectedItems}
          useLink={useLink}
          theme={theme}
          onChangeExpand={onChangeExpand}
          onChangeSelect={onChangeSelect}
        />
      )}
    </li>
  );
};

export default TreeView;
