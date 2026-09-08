import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme/theme';
import PlatformIcon from './icons/PlatformIcon';

export type MenuTab = 'led' | 'stage' | 'settings';

const TABS: MenuTab[] = ['led', 'stage', 'settings'];

const ICON_SIZE = 22;
const ITEM_SIZE = 52;
const GAP = 24;

interface FloatingMenuProps {
  active: MenuTab;
  onSelect: (tab: MenuTab) => void;
}

function TabIcon({ tab, color }: { tab: MenuTab; color: string }) {
  if (tab === 'stage') {
    return <PlatformIcon size={ICON_SIZE} color={color} />;
  }
  const name: keyof typeof Ionicons.glyphMap = tab === 'led' ? 'tv-outline' : 'settings-outline';
  return <Ionicons name={name} size={ICON_SIZE} color={color} />;
}

// iOS 26-style floating tab bar: a fluid-width glass pill, centered, that
// blurs whatever scrolls behind it so content stays visible-but-soft.
export default function FloatingMenu({ active, onSelect }: FloatingMenuProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { bottom: insets.bottom + 16 }]} pointerEvents="box-none">
      <BlurView intensity={60} tint="dark" style={styles.pill}>
        <View style={styles.row}>
          {TABS.map((tab) => {
            const isActive = tab === active;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.item, isActive && styles.itemActive]}
                onPress={() => onSelect(tab)}
                activeOpacity={0.8}
              >
                <TabIcon tab={tab} color={isActive ? colors.background : colors.text} />
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pill: {
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GAP,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  itemActive: {
    backgroundColor: colors.text,
  },
});
