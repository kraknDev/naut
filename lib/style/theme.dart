import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final themeNotifier = StateProvider<Theme>((ref) => Theme());

class Theme {
  final backgroundColor = Color(0xff2a2426);
  final dialogBackgroundColor = Color(0xff1e1b1c);
  final primaryTextColor = Color(0xffe6d6ac);
}
