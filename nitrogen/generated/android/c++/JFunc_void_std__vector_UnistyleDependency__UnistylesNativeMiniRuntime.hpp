///
/// JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime.hpp
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

#pragma once

#include <fbjni/fbjni.h>
#include <functional>

#include <functional>
#include <vector>
#include "UnistyleDependency.hpp"
#include "UnistylesNativeMiniRuntime.hpp"
#include "JUnistyleDependency.hpp"
#include "JUnistylesNativeMiniRuntime.hpp"
#include "ColorScheme.hpp"
#include "JColorScheme.hpp"
#include "Dimensions.hpp"
#include "JDimensions.hpp"
#include <string>
#include "Insets.hpp"
#include "JInsets.hpp"

namespace margelo::nitro::unistyles {

  using namespace facebook;

  /**
   * Represents the Java/Kotlin callback `(dependencies: Array<UnistyleDependency>, miniRuntime: UnistylesNativeMiniRuntime) -> Unit`.
   * This can be passed around between C++ and Java/Kotlin.
   */
  struct JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime: public jni::JavaClass<JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime> {
  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/unistyles/Func_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime;";

  public:
    /**
     * Invokes the function this `JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime` instance holds through JNI.
     */
    void invoke(const std::vector<UnistyleDependency>& dependencies, const UnistylesNativeMiniRuntime& miniRuntime) const {
      static const auto method = getClass()->getMethod<void(jni::alias_ref<jni::JArrayClass<JUnistyleDependency>> /* dependencies */, jni::alias_ref<JUnistylesNativeMiniRuntime> /* miniRuntime */)>("invoke");
      method(self(), [&]() {
        size_t __size = dependencies.size();
        jni::local_ref<jni::JArrayClass<JUnistyleDependency>> __array = jni::JArrayClass<JUnistyleDependency>::newArray(__size);
        for (size_t __i = 0; __i < __size; __i++) {
          const auto& __element = dependencies[__i];
          __array->setElement(__i, *JUnistyleDependency::fromCpp(__element));
        }
        return __array;
      }(), JUnistylesNativeMiniRuntime::fromCpp(miniRuntime));
    }
  };

  /**
   * An implementation of Func_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime that is backed by a C++ implementation (using `std::function<...>`)
   */
  struct JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime_cxx final: public jni::HybridClass<JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime_cxx, JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime> {
  public:
    static jni::local_ref<JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime::javaobject> fromCpp(const std::function<void(const std::vector<UnistyleDependency>& /* dependencies */, const UnistylesNativeMiniRuntime& /* miniRuntime */)>& func) {
      return JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime_cxx::newObjectCxxArgs(func);
    }

  public:
    /**
     * Invokes the C++ `std::function<...>` this `JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime_cxx` instance holds.
     */
    void invoke_cxx(jni::alias_ref<jni::JArrayClass<JUnistyleDependency>> dependencies, jni::alias_ref<JUnistylesNativeMiniRuntime> miniRuntime) {
      _func([&]() {
              size_t __size = dependencies->size();
              std::vector<UnistyleDependency> __vector;
              __vector.reserve(__size);
              for (size_t __i = 0; __i < __size; __i++) {
                auto __element = dependencies->getElement(__i);
                __vector.push_back(__element->toCpp());
              }
              return __vector;
            }(), miniRuntime->toCpp());
    }

  public:
    [[nodiscard]]
    inline const std::function<void(const std::vector<UnistyleDependency>& /* dependencies */, const UnistylesNativeMiniRuntime& /* miniRuntime */)>& getFunction() const {
      return _func;
    }

  public:
    static auto constexpr kJavaDescriptor = "Lcom/margelo/nitro/unistyles/Func_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime_cxx;";
    static void registerNatives() {
      registerHybrid({makeNativeMethod("invoke", JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime_cxx::invoke_cxx)});
    }

  private:
    explicit JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime_cxx(const std::function<void(const std::vector<UnistyleDependency>& /* dependencies */, const UnistylesNativeMiniRuntime& /* miniRuntime */)>& func): _func(func) { }

  private:
    friend HybridBase;
    std::function<void(const std::vector<UnistyleDependency>& /* dependencies */, const UnistylesNativeMiniRuntime& /* miniRuntime */)> _func;
  };

} // namespace margelo::nitro::unistyles
