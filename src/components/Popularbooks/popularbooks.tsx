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
  image?: string;
};

const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1529270292268-6b6f9b9d6b6f?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: '2',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: '3',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: '4',
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1528209392409-6c6e1a1b6b8b?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=60',
  },
];

type PopularBooksProps = {
  books?: Book[];
  onViewAll?: () => void;
};

const PopularBooks: React.FC<PopularBooksProps> = ({ books = sampleBooks, onViewAll }) => {
  const renderCard = ({ item }: { item: Book }) => (
    <View style={styles.bookCard}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.coverImage} />
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
          <Text style={styles.sectionTitle}>Popular Books</Text>
          <Text style={styles.sectionSubtitle}>Trending picks for this week</Text>
        </View>
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAllText}>View All</Text>
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
