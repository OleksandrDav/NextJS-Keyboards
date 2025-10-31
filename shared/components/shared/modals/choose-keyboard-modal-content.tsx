import { KeyboardWithRelations } from "@/@types/keyboard";
import { KeyboardDetailContent } from "../keyboard-page/keyboard-detail-content";

interface Props {
  keyboard: KeyboardWithRelations;
}

export const ChooseKeyboardModalContent: React.FC<Props> = ({ keyboard }) => {
  return (
    <KeyboardDetailContent
      keyboard={keyboard}
      showThumbnails={false}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-h-[85vh] overflow-y-auto"
    />
  );
};