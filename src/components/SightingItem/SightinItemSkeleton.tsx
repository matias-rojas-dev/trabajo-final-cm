import { StyleSheet, View } from 'react-native'

export const SightingItemSkeleton: React.FC = () => {
  return (
    <View style={styles.sightingItemContainer}>
      <View style={styles.sightingItem}>
        <View style={styles.skeletonImage} />
        <View style={styles.sightingInfo}>
          <View style={styles.skeletonText} />
          <View style={[styles.skeletonText, styles.skeletonTextShort]} />
          <View style={[styles.skeletonText, styles.skeletonTextShort]} />
          <View style={[styles.skeletonText, styles.skeletonTextMedium]} />
        </View>
      </View>
      <View style={styles.skeletonButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  sightingItemContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  sightingItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  skeletonImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e1e1e1',
    marginRight: 10,
  },
  sightingInfo: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'space-around',
  },
  skeletonText: {
    height: 12,
    backgroundColor: '#e1e1e1',
    borderRadius: 4,
    marginBottom: 5,
    width: '60%',
  },
  skeletonTextShort: {
    width: '30%',
  },
  skeletonTextMedium: {
    width: '80%',
  },
  skeletonButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#e1e1e1',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingVertical: 10,
    marginBottom: -1,
  },
})
