import { cardShadow, Colors, Typography } from '@/constant';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '@constant/dimentions';
import TextView from '../TextView/textView';

type Book = {
  id: string;
  title: string;
  author: string;
  rating: number;
  coverimage?: string;
};


type PopularBooksProps = {
  books?: Book[];
  onViewAll?: () => void;
};

const PopularBooks: React.FC<PopularBooksProps> = ({ books, onViewAll }) => {
  console.log(books,'books==');
  
  const renderCard = ({ item }: { item: Book }) => (
    <View style={styles.bookCard}>
      {item.coverimage ? (
        <Image source={{ uri: item.coverimage }} style={styles.coverImage} />
      ) : (
        <View style={styles.coverPlaceholder} />
      )}
      <TextView style={styles.bookTitle} numberOfLines={2}>
        {item.title}
      </TextView>
      <TextView style={styles.bookAuthor}>{item.author}</TextView>
      <TextView style={styles.bookRating}>{item.rating.toFixed(1)} ★</TextView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <TextView style={styles.sectionTitle}>Popular Books</TextView>
          <TextView style={styles.sectionSubtitle}>Trending picks for this week</TextView>
        </View>
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll} activeOpacity={0.7}>
          <TextView style={styles.viewAllText}>View All</TextView>
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  sectionTitle: {
     color:Colors.SECONDARY[200],
     ...Typography.BodyBold15
  },
  sectionSubtitle: {
    color:Colors.SECONDARY[500],
    ...Typography.Caption11
  },
  viewAllButton: {
    backgroundColor: Colors.PRIMARY[100],
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    ...cardShadow
  },
  viewAllText: {
     color:Colors.SECONDARY[100],
     ...Typography.BodyBold13
  },
  horizontalList: {
    paddingBottom: 12,
  },
  bookCard: {
    width: 160,
    padding: 14,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#f9f9fb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  coverPlaceholder: {
    height: 120,
    borderRadius: 12,
    backgroundColor: '#dfe4f2',
    marginBottom: 12,
  },
  coverImage: {
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  bookTitle: {
    color:Colors.SECONDARY[500],
    ...Typography.BodyBold13,
    marginBottom: 1,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  bookRating: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.PRIMARY[100],
  },
  tableContainer: {
    marginTop: 16,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#f7f8fb',
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4f0',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eceef6',
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  titleCell: {
    flex: 3,
  },
  ratingCell: {
    textAlign: 'right',
  },
  tableHeaderText: {
    color: '#555',
    fontWeight: '600',
  },
});

export default PopularBooks;
