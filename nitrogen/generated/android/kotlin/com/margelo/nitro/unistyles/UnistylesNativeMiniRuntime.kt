///
/// UnistylesNativeMiniRuntime.kt
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

package com.margelo.nitro.unistyles

import androidx.annotation.Keep
import com.facebook.proguard.annotations.DoNotStrip
import com.margelo.nitro.core.*

/**
 * Represents the JavaScript object/struct "UnistylesNativeMiniRuntime".
 */
@DoNotStrip
@Keep
data class UnistylesNativeMiniRuntime
  @DoNotStrip
  @Keep
  constructor(
    val colorScheme: ColorScheme,
    val screen: Dimensions,
    val contentSizeCategory: String,
    val insets: Insets,
    val pixelRatio: Double,
    val fontScale: Double,
    val rtl: Boolean,
    val statusBar: Dimensions,
    val navigationBar: Dimensions,
    val isPortrait: Boolean,
    val isLandscape: Boolean
  ) {
  /* main constructor */
}
