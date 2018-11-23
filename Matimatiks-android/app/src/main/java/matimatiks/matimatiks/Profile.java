package matimatiks.matimatiks;

import android.annotation.TargetApi;
import android.app.FragmentManager;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.design.widget.Snackbar;
import android.support.v4.view.GravityCompat;
import android.support.v4.view.ViewPager;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;

import com.firebase.ui.auth.AuthUI;
import com.google.android.gms.appinvite.AppInvite;
import com.google.android.gms.appinvite.AppInviteInvitation;
import com.google.android.gms.appinvite.AppInviteInvitationResult;
import com.google.android.gms.appinvite.AppInviteReferral;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;

/**
 * Created by ridwan on 8/16/2016.
 */
public class Profile extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener,
        GoogleApiClient.OnConnectionFailedListener, Waec_jamb_View.OnFragmentInteractionListener,
        Common_entrance_view.OnFragmentInteractionListener, Jr_waec_view.OnFragmentInteractionListener, Exam_View.OnFragmentInteractionListener {

    private FirebaseAuth firebaseAuth;
    private static final int REQUEST_INVITE = 0, RC_SIGN_IN = 0;
    private GoogleApiClient mGoogleApiClient;
    private String TAG = "TAG";
    private Intent intent;
    private ViewPager viewPager;
    private ViewPagerAdapter viewPagerAdapter;
    public static float height,mode;
    public int select;


    /**
     * Take care of popping the fragment back stack or finishing the activity
     * as appropriate.
     */


    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_profile);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }

        Toolbar toolbar = findViewById(R.id.toolBar);
        setSupportActionBar(toolbar);


        toolbar.setBackgroundColor(getResources().getColor(R.color.company_color));


        intent = getIntent();

        select = intent.getIntExtra("SEL", -1);

        mode = intent.getIntExtra("MODE",-1);



        firebaseAuth = FirebaseAuth.getInstance();

        viewPager = findViewById(R.id.viewPager);

        viewPagerAdapter = new ViewPagerAdapter(getSupportFragmentManager());

        if (select == 0 || select == -1) {
            if(mode != 2 ) {
                viewPagerAdapter.addFragments(new Waec_jamb_View(), "WAEC/jamb");
                viewPager.setAdapter(viewPagerAdapter);
            }
            else{
                viewPagerAdapter.addFragments(new Exam_View(), "EXAM_VIEW");
                viewPager.setAdapter(viewPagerAdapter);
            }
        } else if (select == 1) {
            viewPagerAdapter.addFragments(new Jr_waec_view(), "Jr.WAEC");
            viewPager.setAdapter(viewPagerAdapter);
        } else {
            viewPagerAdapter.addFragments(new Common_entrance_view(), "COMMON ENTRANCE");
            viewPager.setAdapter(viewPagerAdapter);
        }

        toolbar.measure(0, 0);

        if (Build.VERSION.SDK_INT <Build.VERSION_CODES.LOLLIPOP)
            height = toolbar.getMeasuredHeight();

        else
            height = toolbar.getMeasuredHeight() + 95;
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);


        // Create an auto-managed GoogleApiClient with access to App Invites.
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addApi(AppInvite.API)
                .enableAutoManage(this, this)
                .build();

        // Check for App Invite invitations and launch deep-link activity if possible.
        // Requires that an Activity is registered in AndroidManifest.xml to handle
        // deep-link URLs.
        boolean autoLaunchDeepLink = true;
        AppInvite.AppInviteApi.getInvitation(mGoogleApiClient, this, autoLaunchDeepLink)
                .setResultCallback(
                        new ResultCallback<AppInviteInvitationResult>() {
                            @Override
                            public void onResult(AppInviteInvitationResult result) {
                                Log.d(TAG, "getInvitation:onResult:" + result.getStatus());
                                if (result.getStatus().isSuccess()) {
                                    // Extract information from the intent
                                    Intent intent = result.getInvitationIntent();
                                    String deepLink = AppInviteReferral.getDeepLink(intent);
                                    String invitationId = AppInviteReferral.getInvitationId(intent);

                                    Log.e("Tag", deepLink);
                                    Log.e("Tag", invitationId);
                                }
                            }
                        });

    }




    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();
        FragmentManager fragmentManager = getFragmentManager();


        if (id == R.id.nav_settings) {

           // Intent intent = new Intent(Profile.this, SettingsActivity.class);
           // startActivity(intent);

            showMessage("Settings coming soon");

        } else if (id == R.id.nav_help) {

       //     Intent intent = new Intent(Profile.this, Help.class);
         //   startActivity(intent);
            showMessage("Help coming soon");

        } else if (id == R.id.nav_share) {

            onInviteClicked();

        } else if (id == R.id.nav_progress) {

            Intent intent = new Intent(Profile.this, ProgressReport.class);
            startActivity(intent);

        }

        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            if (resultCode == RESULT_OK) {
                if (firebaseAuth.getCurrentUser() != null)
                    Log.d(TAG, "nothing de shelz");
                String[] ids = AppInviteInvitation.getInvitationIds(resultCode, data);
                if (ids != null) {
                    for (String id : ids) {
                        Log.d(TAG, "onActivityResult: sent invitation " + id);
                    }
                }
            }
        }
    }

    private void logout() {
        firebaseAuth.signOut();
        AuthUI.getInstance().signOut(this).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {

                finish();

                showMessage("Signed Out");

            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {

                showMessage(e.getMessage());
            }
        });


        Intent intent = new Intent(Profile.this, Logout.class);
        startActivity(intent);
    }

    private void onInviteClicked() {
        Intent intent = new AppInviteInvitation.IntentBuilder(getString(R.string.invitation_title))
                .setMessage(getString(R.string.invitation_message))
                .setDeepLink(Uri.parse(getString(R.string.invitation_deep_link)))
                .setCustomImage(Uri.parse(getString(R.string.invitation_custom_image)))
                .setCallToActionText(getString(R.string.invitation_cta))
                .build();
        startActivityForResult(intent, REQUEST_INVITE);
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

        Log.d(TAG, "onConnectionFailed:" + connectionResult);
        showMessage(getString(R.string.google_play_services_error));
    }

    private void showMessage(String msg) {
        ViewGroup container = findViewById(R.id.snackbar_layout);
        Snackbar.make(container, msg, Snackbar.LENGTH_SHORT).show();
    }

    @Override
    public void onHomeFragmentInteraction(Uri uri) {
        Log.d(TAG, "Succesf1");
    }

    @Override
    public void onTopfreeFragmentInteraction(Uri uri) {
        Log.d(TAG, "Succesf2");
    }

    @Override
    public void onToppaidFragmentInteraction(Uri uri) {
        Log.d(TAG, "Succesf3");
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {}


    /**
     * This method converts device specific pixels to density independent pixels.
     *
     * @param px      A value in px (pixels) unit. Which we need to convert into db
     * @param context Context to get resources and device specific display metrics
     * @return A float value to represent dp equivalent to px value
     */
    public static float convertPixelsToDp(float px, Context context) {
        Resources resources = context.getResources();
        DisplayMetrics metrics = resources.getDisplayMetrics();
        return px / ((float) metrics.densityDpi / DisplayMetrics.DENSITY_DEFAULT);
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}

