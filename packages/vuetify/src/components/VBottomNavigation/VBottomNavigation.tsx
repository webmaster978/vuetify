// Styles
import './VBottomNavigation.sass'

// Composables
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'

// Utilities
import { computed, defineComponent, toRef } from 'vue'
import { makeTagProps } from '@/composables/tag'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBottomNavigation',

  props: makeProps({
    ...makeLayoutItemProps({ name: 'bottom-navigation' }),
    ...makeSheetProps(),
    ...makeTagProps({ tag: 'header' }),
    mobile: Boolean,
    modelValue: Boolean,
    src: String,
    temporary: Boolean,
    height: {
      type: [Number, String],
      default: 64,
    },
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-bottom-navigation')
    // const isActive = useProxiedModel(props, 'modelValue')
    const styles = useLayoutItem(
      props.name,
      toRef(props, 'priority'),
      computed(() => 'bottom'),
      computed(() => props.height),
    )

    return () => {
      const hasImg = (slots.img || props.src)

      return (
        <props.tag
          class={[
            'v-bottom-navigation',
            sheetClasses.value,
          ]}
          style={[
            sheetStyles.value,
            styles.value,
          ]}
        >
          { hasImg && (
            <div class="v-bottom-navigation__img">
              { slots.img
                ? slots.img?.({ src: props.src })
                : (<img src={ props.src } alt="" />)
              }
            </div>
          )}

          <div class="v-bottom-navigation__content">
            { slots.default?.() }
          </div>
        </props.tag>
      )
    }
  },
})
