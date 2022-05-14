import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:riverpod/riverpod.dart';
import 'package:uuid/uuid.dart';

const uuid = Uuid();
final thoughtProvider = StateNotifierProvider<ThoughtNotifier, List<Thought>>(
  (ref) => ThoughtNotifier([Thought(text: 'yooyo', id: uuid.v4())]),
);

@immutable
class Posts {
  final String id;
  final String? text;
  final XFile? image;
  const Posts({this.text, required this.id, this.image});
}

class PostNotifier extends StateNotifier<List<Posts>> {
  PostNotifier(List<Posts>? loadedPosts) : super(loadedPosts ?? []);
  addPost(String text, XFile? image) {
    state = [...state, Posts(id: uuid.v4(), text: text, image: image)];
  }

  removePost(String id) {
    state = state.where((item) => item.id != id).toList();
  }
}

// Card
class Card extends Posts {
  String text;
  final XFile? image;
  Card({required this.text, this.image});
}

class PostNotifier extends StateNotifier<List<Card>> {
  PostNotifier(List<Posts>? loadedPosts) : super(loadedPosts ?? []);
  addCard(String text, XFile? image) {
    state = [...state, Card(id: uuid.v4(), text: text, image: image)];
  }

  removeCard(String id) {
    state = state.where((item) => item.id != id).toList();
  }
}

// Thought
class Thought {
  final String text;
  final String id;
  const Thought({required this.text, required this.id});
}

class ThoughtNotifier extends StateNotifier<List<Thought>> {
  ThoughtNotifier(List<Thought>? loadedThoughts) : super(loadedThoughts ?? []);
  addThought(String text, XFile? image) {
    state = [...state, Card(id: uuid.v4(), text: text, image: image)];
  }

  removeThought(String id) {
    state = state.where((item) => item.id != id).toList();
  }
}
