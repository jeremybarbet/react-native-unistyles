#pragma once

#include <cmath>
#include "HybridStyleSheetSpec.hpp"
#include "HybridUnistylesRuntime.h"
#include "HybridMiniRuntime.h"
// todo remove me
#include <NitroModules/HybridContext.hpp>
#include "Unistyles-Swift-Cxx-Umbrella.hpp"
#include "Helpers.h"
#include "Constants.h"
#include "Breakpoints.h"
#include "StyleSheetRegistry.h"
#include "HostStyle.h"

using namespace margelo::nitro::unistyles;

struct HybridStyleSheet: public HybridStyleSheetSpec {
    HybridStyleSheet(
        Unistyles::HybridNativePlatformSpecCxx nativePlatform,
        std::shared_ptr<HybridUnistylesRuntime> unistylesRuntime
    ) : nativePlatform{nativePlatform}, miniRuntime{std::make_shared<HybridMiniRuntime>(unistylesRuntime)} {}

    jsi::Value create(jsi::Runtime& rt,
                      const jsi::Value& thisValue,
                      const jsi::Value* args,
                      size_t count);
    jsi::Value configure(jsi::Runtime& rt,
                      const jsi::Value& thisValue,
                      const jsi::Value* args,
                      size_t count);

    void loadHybridMethods() override {
        HybridStyleSheetSpec::loadHybridMethods();

        registerHybrids(this, [](Prototype& prototype) {
            prototype.registerHybridMethod("create", &HybridStyleSheet::create);
            prototype.registerHybridMethod("configure", &HybridStyleSheet::configure);
        });
    };

    double getHairlineWidth() override;

private:
    void parseSettings(jsi::Runtime& rt, jsi::Object settings);
    void parseBreakpoints(jsi::Runtime& rt, jsi::Object breakpoints);
    void parseThemes(jsi::Runtime& rt, jsi::Object themes);
    void verifyAndSelectTheme(jsi::Runtime &rt);
    void setThemeFromColorScheme(jsi::Runtime& rt);
    void attachMetaFunctions(jsi::Runtime& rt, core::StyleSheet& styleSheet, jsi::Object& parsedStyleSheet);

    Unistyles::HybridNativePlatformSpecCxx nativePlatform;
    std::shared_ptr<HybridMiniRuntime> miniRuntime;
    core::StyleSheetRegistry styleSheetRegistry{miniRuntime};
};

