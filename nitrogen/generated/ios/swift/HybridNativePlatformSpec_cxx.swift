///
/// HybridNativePlatformSpec_cxx.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

import Foundation
import NitroModules

/**
 * A class implementation that bridges HybridNativePlatformSpec over to C++.
 * In C++, we cannot use Swift protocols - so we need to wrap it in a class to make it strongly defined.
 *
 * Also, some Swift types need to be bridged with special handling:
 * - Enums need to be wrapped in Structs, otherwise they cannot be accessed bi-directionally (Swift bug: https://github.com/swiftlang/swift/issues/75330)
 * - Other HybridObjects need to be wrapped/unwrapped from the Swift TCxx wrapper
 * - Throwing methods need to be wrapped with a Result<T, Error> type, as exceptions cannot be propagated to C++
 */
public class HybridNativePlatformSpec_cxx {
  /**
   * The Swift <> C++ bridge's namespace (`margelo::nitro::unistyles::bridge::swift`)
   * from `Unistyles-Swift-Cxx-Bridge.hpp`.
   * This contains specialized C++ templates, and C++ helper functions that can be accessed from Swift.
   */
  public typealias bridge = margelo.nitro.unistyles.bridge.swift

  /**
   * Holds an instance of the `HybridNativePlatformSpec` Swift protocol.
   */
  private var __implementation: any HybridNativePlatformSpec

  /**
   * Holds a weak pointer to the C++ class that wraps the Swift class.
   */
  private var __cxxPart: bridge.std__weak_ptr_margelo__nitro__unistyles__HybridNativePlatformSpec_

  /**
   * Create a new `HybridNativePlatformSpec_cxx` that wraps the given `HybridNativePlatformSpec`.
   * All properties and methods bridge to C++ types.
   */
  public init(_ implementation: any HybridNativePlatformSpec) {
    self.__implementation = implementation
    self.__cxxPart = .init()
    /* no base class */
  }

  /**
   * Get the actual `HybridNativePlatformSpec` instance this class wraps.
   */
  @inline(__always)
  public func getHybridNativePlatformSpec() -> any HybridNativePlatformSpec {
    return __implementation
  }

  /**
   * Casts this instance to a retained unsafe raw pointer.
   * This acquires one additional strong reference on the object!
   */
  public func toUnsafe() -> UnsafeMutableRawPointer {
    return Unmanaged.passRetained(self).toOpaque()
  }

  /**
   * Casts an unsafe pointer to a `HybridNativePlatformSpec_cxx`.
   * The pointer has to be a retained opaque `Unmanaged<HybridNativePlatformSpec_cxx>`.
   * This removes one strong reference from the object!
   */
  public class func fromUnsafe(_ pointer: UnsafeMutableRawPointer) -> HybridNativePlatformSpec_cxx {
    return Unmanaged<HybridNativePlatformSpec_cxx>.fromOpaque(pointer).takeRetainedValue()
  }

  /**
   * Gets (or creates) the C++ part of this Hybrid Object.
   * The C++ part is a `std::shared_ptr<margelo::nitro::unistyles::HybridNativePlatformSpec>`.
   */
  public func getCxxPart() -> bridge.std__shared_ptr_margelo__nitro__unistyles__HybridNativePlatformSpec_ {
    let cachedCxxPart = self.__cxxPart.lock()
    if cachedCxxPart.__convertToBool() {
      return cachedCxxPart
    } else {
      let newCxxPart = bridge.create_std__shared_ptr_margelo__nitro__unistyles__HybridNativePlatformSpec_(self.toUnsafe())
      __cxxPart = bridge.weakify_std__shared_ptr_margelo__nitro__unistyles__HybridNativePlatformSpec_(newCxxPart)
      return newCxxPart
    }
  }

  

  /**
   * Get the memory size of the Swift class (plus size of any other allocations)
   * so the JS VM can properly track it and garbage-collect the JS object if needed.
   */
  @inline(__always)
  public var memorySize: Int {
    return MemoryHelper.getSizeOf(self.__implementation) + self.__implementation.memorySize
  }

  // Properties
  

  // Methods
  @inline(__always)
  public func getInsets() -> bridge.Result_Insets_ {
    do {
      let __result = try self.__implementation.getInsets()
      let __resultCpp = __result
      return bridge.create_Result_Insets_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_Insets_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getColorScheme() -> bridge.Result_ColorScheme_ {
    do {
      let __result = try self.__implementation.getColorScheme()
      let __resultCpp = __result
      return bridge.create_Result_ColorScheme_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_ColorScheme_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getFontScale() -> bridge.Result_double_ {
    do {
      let __result = try self.__implementation.getFontScale()
      let __resultCpp = __result
      return bridge.create_Result_double_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_double_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getPixelRatio() -> bridge.Result_double_ {
    do {
      let __result = try self.__implementation.getPixelRatio()
      let __resultCpp = __result
      return bridge.create_Result_double_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_double_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getOrientation() -> bridge.Result_Orientation_ {
    do {
      let __result = try self.__implementation.getOrientation()
      let __resultCpp = __result
      return bridge.create_Result_Orientation_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_Orientation_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getContentSizeCategory() -> bridge.Result_std__string_ {
    do {
      let __result = try self.__implementation.getContentSizeCategory()
      let __resultCpp = std.string(__result)
      return bridge.create_Result_std__string_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_std__string_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getScreenDimensions() -> bridge.Result_Dimensions_ {
    do {
      let __result = try self.__implementation.getScreenDimensions()
      let __resultCpp = __result
      return bridge.create_Result_Dimensions_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_Dimensions_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getStatusBarDimensions() -> bridge.Result_Dimensions_ {
    do {
      let __result = try self.__implementation.getStatusBarDimensions()
      let __resultCpp = __result
      return bridge.create_Result_Dimensions_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_Dimensions_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getNavigationBarDimensions() -> bridge.Result_Dimensions_ {
    do {
      let __result = try self.__implementation.getNavigationBarDimensions()
      let __resultCpp = __result
      return bridge.create_Result_Dimensions_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_Dimensions_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getPrefersRtlDirection() -> bridge.Result_bool_ {
    do {
      let __result = try self.__implementation.getPrefersRtlDirection()
      let __resultCpp = __result
      return bridge.create_Result_bool_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_bool_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func setRootViewBackgroundColor(color: Double) -> bridge.Result_void_ {
    do {
      try self.__implementation.setRootViewBackgroundColor(color: color)
      return bridge.create_Result_void_()
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_void_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func setNavigationBarHidden(isHidden: Bool) -> bridge.Result_void_ {
    do {
      try self.__implementation.setNavigationBarHidden(isHidden: isHidden)
      return bridge.create_Result_void_()
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_void_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func setStatusBarHidden(isHidden: Bool) -> bridge.Result_void_ {
    do {
      try self.__implementation.setStatusBarHidden(isHidden: isHidden)
      return bridge.create_Result_void_()
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_void_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func setImmersiveMode(isEnabled: Bool) -> bridge.Result_void_ {
    do {
      try self.__implementation.setImmersiveMode(isEnabled: isEnabled)
      return bridge.create_Result_void_()
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_void_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func getMiniRuntime() -> bridge.Result_UnistylesNativeMiniRuntime_ {
    do {
      let __result = try self.__implementation.getMiniRuntime()
      let __resultCpp = __result
      return bridge.create_Result_UnistylesNativeMiniRuntime_(__resultCpp)
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_UnistylesNativeMiniRuntime_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func registerPlatformListener(callback: bridge.Func_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime) -> bridge.Result_void_ {
    do {
      try self.__implementation.registerPlatformListener(callback: { () -> ([UnistyleDependency], UnistylesNativeMiniRuntime) -> Void in
        let __wrappedFunction = bridge.wrap_Func_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime(callback)
        return { (__dependencies: [UnistyleDependency], __miniRuntime: UnistylesNativeMiniRuntime) -> Void in
          __wrappedFunction.call({ () -> bridge.std__vector_UnistyleDependency_ in
            var __vector = bridge.create_std__vector_UnistyleDependency_(__dependencies.count)
            for __item in __dependencies {
              __vector.push_back(__item)
            }
            return __vector
          }(), __miniRuntime)
        }
      }())
      return bridge.create_Result_void_()
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_void_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func registerImeListener(callback: bridge.Func_void_UnistylesNativeMiniRuntime) -> bridge.Result_void_ {
    do {
      try self.__implementation.registerImeListener(callback: { () -> (UnistylesNativeMiniRuntime) -> Void in
        let __wrappedFunction = bridge.wrap_Func_void_UnistylesNativeMiniRuntime(callback)
        return { (__miniRuntime: UnistylesNativeMiniRuntime) -> Void in
          __wrappedFunction.call(__miniRuntime)
        }
      }())
      return bridge.create_Result_void_()
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_void_(__exceptionPtr)
    }
  }
  
  @inline(__always)
  public func unregisterPlatformListeners() -> bridge.Result_void_ {
    do {
      try self.__implementation.unregisterPlatformListeners()
      return bridge.create_Result_void_()
    } catch (let __error) {
      let __exceptionPtr = __error.toCpp()
      return bridge.create_Result_void_(__exceptionPtr)
    }
  }
}
