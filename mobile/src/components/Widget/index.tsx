import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';
import BottomSheet from '@gorhom/bottom-sheet';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          weight='bold'
          size={24}
          color={theme.colors.text_on_brand_color}
        />

      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 270]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent 
          ? <Success onSendAnotherFeedback={handleRestartFeedback}/>
          : 
          <>
            {
              feedbackType ?
              <Form 
                feedbackType={feedbackType}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
              :
              <Options onFeedbackTypeChange={setFeedbackType}/>
            }
          </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);