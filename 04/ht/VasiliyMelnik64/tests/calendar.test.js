"@fixture calendar";
"@page https://vasiliymelnik64.github.io/projects/interactiveCalendar/index.html#Calendar_1";

"@test"["headerNavAsserts"] = {
    "1.Assert": function() {
        eq($("[name='Calendar_0'].item__link").length > 0, true);
        eq($(":containsExcludeChildren(Calendar)").eq(0).length > 0, true);
        eq($(".list__item.item").find(" > a:nth(0)").eq(0).length > 0, true);
        eq($("body > div:nth(1) > header:nth(0) > ul:nth(0) > li:nth(0) > a:nth(0)").length > 0, true);
        ok($("[name='Calendar_0'].item__link").length > 0);
        ok($(":containsExcludeChildren(Calendar)").eq(0).length > 0);
        ok($(".list__item.item").find(" > a:nth(0)").eq(0).length > 0);
        ok($("body > div:nth(1) > header:nth(0) > ul:nth(0) > li:nth(0) > a:nth(0)").length > 0);
        eq($(":containsExcludeChildren(Create)").length > 0, true);
        eq($("[name='Calendar_1'].item__link").length > 0, true);
        eq($(".list__item.item").find(" > a:nth(0)").eq(1).length > 0, true);
        eq($("body > div:nth(1) > header:nth(0) > ul:nth(0) > li:nth(1) > a:nth(0)").length > 0, true);
        ok($(":containsExcludeChildren(Create)").length > 0);
        ok($("[name='Calendar_1'].item__link").length > 0);
        ok($(".list__item.item").find(" > a:nth(0)").eq(1).length > 0);
        ok($("body > div:nth(1) > header:nth(0) > ul:nth(0) > li:nth(1) > a:nth(0)").length > 0);
        eq($(":containsExcludeChildren(About)").length > 0, true);
        eq($("[name='About'].item__link").length > 0, true);
        eq($(".list__item.item").find(" > a:nth(0)").eq(2).length > 0, true);
        eq($("body > div:nth(1) > header:nth(0) > ul:nth(0) > li:nth(2) > a:nth(0)").length > 0, true);
        ok($(":containsExcludeChildren(About)").length > 0);
        ok($("[name='About'].item__link").length > 0);
        ok($(".list__item.item").find(" > a:nth(0)").eq(2).length > 0);
        ok($("body > div:nth(1) > header:nth(0) > ul:nth(0) > li:nth(2) > a:nth(0)").length > 0);
    }
};

