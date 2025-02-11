///
/// UnistyleDependency.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

#pragma once

#include <cmath>
#if __has_include(<NitroModules/JSIConverter.hpp>)
#include <NitroModules/JSIConverter.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif
#if __has_include(<NitroModules/NitroDefines.hpp>)
#include <NitroModules/NitroDefines.hpp>
#else
#error NitroModules cannot be found! Are you sure you installed NitroModules properly?
#endif

namespace margelo::nitro::unistyles {

  /**
   * An enum which can be represented as a JavaScript enum (UnistyleDependency).
   */
  enum class UnistyleDependency {
    THEME      SWIFT_NAME(theme) = 0,
    THEMENAME      SWIFT_NAME(themename) = 1,
    ADAPTIVETHEMES      SWIFT_NAME(adaptivethemes) = 2,
    BREAKPOINTS      SWIFT_NAME(breakpoints) = 3,
    VARIANTS      SWIFT_NAME(variants) = 4,
    COLORSCHEME      SWIFT_NAME(colorscheme) = 5,
    DIMENSIONS      SWIFT_NAME(dimensions) = 6,
    ORIENTATION      SWIFT_NAME(orientation) = 7,
    CONTENTSIZECATEGORY      SWIFT_NAME(contentsizecategory) = 8,
    INSETS      SWIFT_NAME(insets) = 9,
    PIXELRATIO      SWIFT_NAME(pixelratio) = 10,
    FONTSCALE      SWIFT_NAME(fontscale) = 11,
    STATUSBAR      SWIFT_NAME(statusbar) = 12,
    NAVIGATIONBAR      SWIFT_NAME(navigationbar) = 13,
    IME      SWIFT_NAME(ime) = 14,
  } CLOSED_ENUM;

} // namespace margelo::nitro::unistyles

namespace margelo::nitro {

  using namespace margelo::nitro::unistyles;

  // C++ UnistyleDependency <> JS UnistyleDependency (enum)
  template <>
  struct JSIConverter<UnistyleDependency> final {
    static inline UnistyleDependency fromJSI(jsi::Runtime& runtime, const jsi::Value& arg) {
      int enumValue = JSIConverter<int>::fromJSI(runtime, arg);
      return static_cast<UnistyleDependency>(enumValue);
    }
    static inline jsi::Value toJSI(jsi::Runtime& runtime, UnistyleDependency arg) {
      int enumValue = static_cast<int>(arg);
      return JSIConverter<int>::toJSI(runtime, enumValue);
    }
    static inline bool canConvert(jsi::Runtime&, const jsi::Value& value) {
      if (!value.isNumber()) {
        return false;
      }
      double integer;
      double fraction = modf(value.getNumber(), &integer);
      if (fraction != 0.0) {
        // It is some kind of floating point number - our enums are ints.
        return false;
      }
      // Check if we are within the bounds of the enum.
      return integer >= 0 && integer <= 14;
    }
  };

} // namespace margelo::nitro
