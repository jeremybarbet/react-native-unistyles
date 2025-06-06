///
/// JUnistyleDependency.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

#pragma once

#include <fbjni/fbjni.h>
#include "UnistyleDependency.hpp"

namespace margelo::nitro::unistyles {

  using namespace facebook;

  /**
   * The C++ JNI bridge between the C++ enum "UnistyleDependency" and the the Kotlin enum "UnistyleDependency".
   */
  struct JUnistyleDependency final: public jni::JavaClass<JUnistyleDependency> {
  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/unistyles/UnistyleDependency;";

  public:
    /**
     * Convert this Java/Kotlin-based enum to the C++ enum UnistyleDependency.
     */
    [[maybe_unused]]
    [[nodiscard]]
    UnistyleDependency toCpp() const {
      static const auto clazz = javaClassStatic();
      static const auto fieldOrdinal = clazz->getField<int>("_ordinal");
      int ordinal = this->getFieldValue(fieldOrdinal);
      return static_cast<UnistyleDependency>(ordinal);
    }

  public:
    /**
     * Create a Java/Kotlin-based enum with the given C++ enum's value.
     */
    [[maybe_unused]]
    static jni::alias_ref<JUnistyleDependency> fromCpp(UnistyleDependency value) {
      static const auto clazz = javaClassStatic();
      static const auto fieldTHEME = clazz->getStaticField<JUnistyleDependency>("THEME");
      static const auto fieldTHEMENAME = clazz->getStaticField<JUnistyleDependency>("THEMENAME");
      static const auto fieldADAPTIVETHEMES = clazz->getStaticField<JUnistyleDependency>("ADAPTIVETHEMES");
      static const auto fieldBREAKPOINTS = clazz->getStaticField<JUnistyleDependency>("BREAKPOINTS");
      static const auto fieldVARIANTS = clazz->getStaticField<JUnistyleDependency>("VARIANTS");
      static const auto fieldCOLORSCHEME = clazz->getStaticField<JUnistyleDependency>("COLORSCHEME");
      static const auto fieldDIMENSIONS = clazz->getStaticField<JUnistyleDependency>("DIMENSIONS");
      static const auto fieldORIENTATION = clazz->getStaticField<JUnistyleDependency>("ORIENTATION");
      static const auto fieldCONTENTSIZECATEGORY = clazz->getStaticField<JUnistyleDependency>("CONTENTSIZECATEGORY");
      static const auto fieldINSETS = clazz->getStaticField<JUnistyleDependency>("INSETS");
      static const auto fieldPIXELRATIO = clazz->getStaticField<JUnistyleDependency>("PIXELRATIO");
      static const auto fieldFONTSCALE = clazz->getStaticField<JUnistyleDependency>("FONTSCALE");
      static const auto fieldSTATUSBAR = clazz->getStaticField<JUnistyleDependency>("STATUSBAR");
      static const auto fieldNAVIGATIONBAR = clazz->getStaticField<JUnistyleDependency>("NAVIGATIONBAR");
      static const auto fieldIME = clazz->getStaticField<JUnistyleDependency>("IME");
      static const auto fieldRTL = clazz->getStaticField<JUnistyleDependency>("RTL");
      
      switch (value) {
        case UnistyleDependency::THEME:
          return clazz->getStaticFieldValue(fieldTHEME);
        case UnistyleDependency::THEMENAME:
          return clazz->getStaticFieldValue(fieldTHEMENAME);
        case UnistyleDependency::ADAPTIVETHEMES:
          return clazz->getStaticFieldValue(fieldADAPTIVETHEMES);
        case UnistyleDependency::BREAKPOINTS:
          return clazz->getStaticFieldValue(fieldBREAKPOINTS);
        case UnistyleDependency::VARIANTS:
          return clazz->getStaticFieldValue(fieldVARIANTS);
        case UnistyleDependency::COLORSCHEME:
          return clazz->getStaticFieldValue(fieldCOLORSCHEME);
        case UnistyleDependency::DIMENSIONS:
          return clazz->getStaticFieldValue(fieldDIMENSIONS);
        case UnistyleDependency::ORIENTATION:
          return clazz->getStaticFieldValue(fieldORIENTATION);
        case UnistyleDependency::CONTENTSIZECATEGORY:
          return clazz->getStaticFieldValue(fieldCONTENTSIZECATEGORY);
        case UnistyleDependency::INSETS:
          return clazz->getStaticFieldValue(fieldINSETS);
        case UnistyleDependency::PIXELRATIO:
          return clazz->getStaticFieldValue(fieldPIXELRATIO);
        case UnistyleDependency::FONTSCALE:
          return clazz->getStaticFieldValue(fieldFONTSCALE);
        case UnistyleDependency::STATUSBAR:
          return clazz->getStaticFieldValue(fieldSTATUSBAR);
        case UnistyleDependency::NAVIGATIONBAR:
          return clazz->getStaticFieldValue(fieldNAVIGATIONBAR);
        case UnistyleDependency::IME:
          return clazz->getStaticFieldValue(fieldIME);
        case UnistyleDependency::RTL:
          return clazz->getStaticFieldValue(fieldRTL);
        default:
          std::string stringValue = std::to_string(static_cast<int>(value));
          throw std::invalid_argument("Invalid enum value (" + stringValue + "!");
      }
    }
  };

} // namespace margelo::nitro::unistyles
