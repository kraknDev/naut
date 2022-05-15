import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:riverpod/riverpod.dart';
import 'package:uuid/uuid.dart';

const uuid = Uuid();
final cardProvider = StateNotifierProvider<CardNotifier, List<Card>>(
  (ref) => CardNotifier([Card(text: 'yooyo', id: uuid.v4())]),
);

@immutable
class Card {
  final String id;
  final String? text;
  final XFile? image;
  const Card({this.text, required this.id, this.image});
}

class CardNotifier extends StateNotifier<List<Card>> {
  CardNotifier(List<Card>? loadedCard) : super(loadedCard ?? []);
  addCard(String? text, XFile image) {
    state = [...state, Card(id: uuid.v4(), text: text, image: image)];
  }

  addThought(String text) {
    state = [...state, Card(id: uuid.v4(), text: text)];
  }

  removeCard(String id) {
    state = state.where((item) => item.id != id).toList();
  }
}
