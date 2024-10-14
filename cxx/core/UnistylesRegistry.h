#pragma once

#include "set"
#include <jsi/jsi.h>
#include <folly/dynamic.h>
#include <react/renderer/uimanager/UIManager.h>
#include <unordered_map>
#include <unordered_set>
#include "Breakpoints.h"
#include "StyleSheetRegistry.h"
#include "StyleSheet.h"
#include "Unistyle.h"
#include "UnistyleData.h"
#include "ShadowTrafficController.h"

namespace margelo::nitro::unistyles::core {

struct UnistylesState;

using namespace facebook;
using namespace facebook::react;

using DependencyMap = std::unordered_map<const ShadowNodeFamily*, std::vector<std::shared_ptr<UnistyleData>>>;

struct UnistylesRegistry: public StyleSheetRegistry {
    static UnistylesRegistry& get();

    UnistylesRegistry(const UnistylesRegistry&) = delete;
    UnistylesRegistry(const UnistylesRegistry&&) = delete;

    void registerTheme(jsi::Runtime& rt, std::string name, jsi::Object&& theme);
    void registerBreakpoints(jsi::Runtime& rt, std::vector<std::pair<std::string, double>>& sortedBreakpoints);
    void setPrefersAdaptiveThemes(jsi::Runtime& rt, bool prefersAdaptiveThemes);
    void setInitialThemeName(jsi::Runtime& rt, std::string themeName);
    void updateTheme(jsi::Runtime& rt, std::string& themeName, jsi::Function&& callback);

    UnistylesState& getState(jsi::Runtime& rt);
    void createState(jsi::Runtime& rt);
    void linkShadowNodeWithUnistyle(jsi::Runtime& rt, const ShadowNodeFamily*, const core::Unistyle::Shared, Variants& variants, std::vector<folly::dynamic>&);
    void unlinkShadowNodeWithUnistyle(jsi::Runtime& rt, const ShadowNodeFamily*, const core::Unistyle::Shared);
    std::shared_ptr<core::StyleSheet> addStyleSheet(jsi::Runtime& rt, int tag, core::StyleSheetType type, jsi::Object&& rawValue);
    DependencyMap buildDependencyMap(jsi::Runtime& rt, std::vector<UnistyleDependency>& deps);
    DependencyMap buildDependencyMap(jsi::Runtime& rt);
    shadow::ShadowTrafficController trafficController{};
    
private:
    UnistylesRegistry() = default;

    std::unordered_map<jsi::Runtime*, UnistylesState> _states{};
    std::unordered_map<jsi::Runtime*, std::unordered_map<int, std::shared_ptr<core::StyleSheet>>> _styleSheetRegistry{};
    std::unordered_map<jsi::Runtime*, std::unordered_map<const ShadowNodeFamily*, std::vector<std::shared_ptr<UnistyleData>>>> _shadowRegistry{};
};

UnistylesRegistry& UnistylesRegistry::get() {
    static UnistylesRegistry cache;

    return cache;
}

}
