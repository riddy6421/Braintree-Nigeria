package matimatiks.matimatiks;

import android.support.test.filters.LargeTest;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;

import org.junit.After;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static org.junit.Assert.*;

@RunWith(AndroidJUnit4.class)
@LargeTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class SplashscreenTest {

    @Rule
     public ActivityTestRule<Splashscreen> msplashscreen = new ActivityTestRule<>(Splashscreen.class);

    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void onCreate() {
        onView(withText("MATIMATIKS")).check(matches(isDisplayed()));
    }

    @After
    public void tearDown() throws Exception {
    }
}