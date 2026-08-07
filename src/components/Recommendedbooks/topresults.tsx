import React, {FC} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors, Typography} from '@constant/index';
import TextView from '../TextView/textView';

interface BookItem {
  id: string;
  title: string;
  author: string;
  rating: any;
  image: any;
}

interface TopResultsProps {
  books: BookItem[];
  onPress?: (book: BookItem) => void;
}

const sampleBooks: BookItem[] = [
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


const TopResults: FC<TopResultsProps> = ({books, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Results</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}>
        {sampleBooks.map(book => (
          <TouchableOpacity
            key={book.id}
            activeOpacity={0.7}
            style={styles.bookItem}
            onPress={() => onPress?.(book)}>
            
           
            <Image source={{uri:book.image}} style={styles.bookImage} />

           
            <View style={styles.bookInfo}>
              <TextView style={styles.bookTitle} numberOfLines={1}>
                {book.title}
              </TextView>

              <TextView style={styles.author} numberOfLines={1}>
                {book.author}
              </TextView>
            </View>

           
            <View style={styles.ratingContainer}>
              <TextView style={styles.star}>★</TextView>
              <TextView style={styles.rating}>{book.rating}</TextView>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopResults;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  heading: {
    ...Typography.BodyBold14,
    color: '#111827',
    marginBottom: 12,
  },

  listContent: {
    paddingBottom: 20,
  },

  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70,
    marginBottom: 12,
  },

  bookImage: {
    width: 50,
    height: 64,
    borderRadius: 5,
    resizeMode: 'cover',
    backgroundColor: '#F3F4F6',
  },

  bookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  bookTitle: {
    ...Typography.BodyBold14,
    color: '#111827',
    marginBottom: 4,
  },

  author: {
    ...Typography.BodyRegular12,
    color: '#6B7280',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },

  star: {
    color: Colors.PRIMARY[100],
    fontSize: 15,
    marginRight: 3,
  },

  rating: {
    ...Typography.BodyRegular12,
    color: '#4B5563',
  },
});